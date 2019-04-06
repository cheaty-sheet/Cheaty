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

const debug = require('debug')('cheaty:renderer:html');

const resources = join(__dirname, "../../../../../resources");

const defaultStyle = fs.readFileSync(join(resources, "template/html/style.css")).toString();
debug('read style');

marked.setOptions({
    gfm: true,
    breaks: true,
});

function safeMarkedParse(markdown?: string) {
    debug('rendered markdown');
    return markdown ? marked.parse(markdown) : markdown
}

class HTMLRender implements Render {
    constructor(private html: string) {
    }

    saveToDisk(path: string): void {
        fs.writeFileSync(path, this.html);
        debug('saved render to disk')
    }

    toString(): string {
        return this.html;
    }
}

export default class HTMLRenderer implements Renderer {
    private static computeStyle(cheatySheet: CheatySheet): { style?: string, styleUrl?: string } {
        if (cheatySheet.options.replaceStyleUrl) {
            return {style: undefined, styleUrl: cheatySheet.options.replaceStyleUrl}
        } else if (cheatySheet.options.replaceStyle) {
            return {style: cheatySheet.options.replaceStyle}
        } else {
            const style: { style?: string, styleUrl?: string } = {style: defaultStyle};
            if (cheatySheet.options.fontSize) style.style += `\n.sections { font-size: ${cheatySheet.options.fontSize}pt; }`;
            if (cheatySheet.options.additionalStyle) style.style += '\n' + cheatySheet.options.additionalStyle;
            if (cheatySheet.options.additionalStyleUrl) style.styleUrl = cheatySheet.options.additionalStyleUrl;
            return style;
        }
    }

    async render(cheatySheet: CheatySheet): Promise<Render> {
        debug('rendering html');
        const templateHtml = fs.readFileSync(join(resources, "template/html/template.html")).toString();
        debug('read template');


        const template = compile(templateHtml);
        debug('compiled template');
        let data = {
            style: HTMLRenderer.computeStyle(cheatySheet),
            title: cheatySheet.title,
            description: cheatySheet.description,
            author: safeMarkedParse(cheatySheet.options.author),
            size: cheatySheet.options.size,
            watermark: cheatySheet.options.watermark,
            logoSrc: cheatySheet.options.logo,
            highlightTheme: cheatySheet.options.highlightTheme,
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
                            content: safeMarkedParse(section.content)
                        }
                    } else if (section instanceof TextSection) {
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
        debug('computed data object');

        return new HTMLRender(template(data));

    }
}