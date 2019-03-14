import CheatySheet, {Options} from "../../CheatySheet";
import Parser from "./Parser.interface";
import Block from "../blocks/Block";
import TextSection from "../blocks/TextSection";
import CodeSection from "../blocks/CodeSection";
import MarkdownSection from "../blocks/MarkdownSection";
import {InvalidBlockError} from "../../Errors";

const fs = require('fs');
const yaml = require('js-yaml');

export default class YMLParser implements Parser {
    async parseFromDisk(path: string): Promise<CheatySheet> {
        return this.parseFromString(fs.readFileSync(path));
    }

    async parseFromString(string: string): Promise<CheatySheet> {
        const definition = yaml.safeLoad(string);
        let optionblock = definition.options;

        let options: Options;
        if (optionblock) {
            options = new Options({
                size: optionblock.size,
                logo: optionblock.logo,
                highlightTheme: optionblock.highlight_theme,
                watermark: optionblock.watermark,
                additionalStyle: optionblock.additional_style,
                replaceStyle: optionblock.replace_style,
                author: optionblock.author
            })
        } else options = new Options();

        const blocks = definition.blocks.map((block: any) => {
            if (block.title == undefined || block.sections == undefined) {
                throw new InvalidBlockError(block)
            } else {
                return new Block(block.title, block.sections.map((section: any) => {
                    switch (section.type) {
                        case 'text':
                            return new TextSection(section.content);
                        case 'markdown':
                            return new MarkdownSection(section.content);
                        case 'code':
                            return new CodeSection(section.language || 'text', section.content);
                        default:
                            console.log('invalid section');
                            console.log(section)
                    }
                }).filter((section: any) => section != undefined));

            }

        }).filter((block: any) => block != undefined);

        return new CheatySheet(
            definition.title,
            definition.description,
            blocks,
            options);
    }

}