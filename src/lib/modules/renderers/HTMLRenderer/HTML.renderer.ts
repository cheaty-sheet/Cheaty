import CheatySheet from "../../../CheatySheet";
import Renderer from "../Renderer.interface";
import Render from "../Render.interface";

import {join} from "path"
import {compile} from "handlebars";
import CodeSection from "../../blocks/CodeSection";
import TextSection from "../../blocks/TextSection";
import * as marked from "marked"
import MarkdownSection from "../../blocks/MarkdownSection";

const fs = require('fs');

const resources = join(__dirname, "../../../../../resources");


class HTMLRender implements Render {
    constructor(private html: string) {
    }

    saveToDisk(path: string): void {
        fs.writeFileSync(path, this.html);
    }

    toString(): string {
        return this.html;
    }
}

export default class HTMLRenderer implements Renderer {
    async render(cheatySheet: CheatySheet, options: object = {}): Promise<Render> {
        const templateHtml = fs.readFileSync(join(resources, "template/html/template.html")).toString();
        let style = fs.readFileSync(join(resources, "template/html/style.css")).toString();

        const template = compile(templateHtml);
        let data = {
            style: cheatySheet.options.replace_style || style + '\n' + (cheatySheet.options.additional_style || ''),
            title: cheatySheet.title,
            description: cheatySheet.description,
            size: cheatySheet.size,
            options: cheatySheet.options,
            highlightTheme: cheatySheet.options.highlight_theme || 'github',
            blocks: cheatySheet.blocks.map(block => ({
                title: block.title,
                sections: block.sections.map(section => {
                    if (section instanceof CodeSection) {
                        return {
                            isCode: true,
                            language: section.language,
                            content: section.content
                        }
                    } else if (section instanceof MarkdownSection) {
                        return {
                            isMarkdown: true,
                            content: marked.parse(section.content)
                        }
                    }else if (section instanceof TextSection) {
                        return {
                            isText: true,
                            content: section.content
                        }
                    } else {
                        return {
                            isUnsupported: true,
                            content: section.content
                        }
                    }
                })
            }))
        };

        return new HTMLRender(template(data));

    }
}