import CheatySheet, {Options} from "../../CheatySheet";
import Parser from "./Parser.interface";
import Block from "../blocks/Block";
import TextSection from "../blocks/TextSection";
import CodeSection from "../blocks/CodeSection";
import MarkdownSection from "../blocks/MarkdownSection";
import {InvalidBlockError} from "../../Errors";

const fs = require('fs');
const yaml = require('js-yaml');
const debug = require('debug')('cheaty:parser:yml');

export default class YMLParser implements Parser {
    async parseFromDisk(path: string): Promise<CheatySheet> {
        debug('parsing yml from disk');
        return this.parseFromString(fs.readFileSync(path));
    }

    async parseFromString(string: string): Promise<CheatySheet> {
        debug('parsing yml from string');
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
                additionalStyleUrl: optionblock.additional_style_url,
                replaceStyle: optionblock.replace_style,
                replaceStyleUrl: optionblock.replace_style_url,
                author: optionblock.author,
                fontSize: optionblock.font_size
            })
        } else options = new Options();
        debug('parsed options');

        const blocks = definition.blocks.map((block: any) => {
            if (block.title == undefined || block.sections == undefined) {
                throw new InvalidBlockError(block)
            } else {
                const style = block.style || {};
                return new Block(block.title, style, block.sections.map((section: any) => {
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
        debug('parsed blocks');

        return new CheatySheet(
            definition.title,
            definition.description,
            blocks,
            options);
    }

}