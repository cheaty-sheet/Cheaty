import CheatySheet from "../../CheatySheet";
import Parser from "./Parser.interface";
import Block from "../blocks/Block";
import TextSection from "../blocks/TextSection";
import CodeSection from "../blocks/CodeSection";

const fs = require('fs');
const yaml = require('js-yaml');

export default class YMLParser implements Parser {
    async parseFromDisk(path: string): Promise<CheatySheet> {
        return this.parseFromString(fs.readFileSync(path));
    }

    async parseFromString(string: string): Promise<CheatySheet> {
        const cheatySheet = new CheatySheet();

        const definition = yaml.safeLoad(string);

        cheatySheet.title = definition.title || 'Cheaty Sheet Cheat Sheet';
        cheatySheet.description = definition.description;

        cheatySheet.blocks = definition.blocks.map((block: any) => {
            if (block.title == undefined || block.sections == undefined) {
                console.log('invalid block');
                console.log(block)
            } else {
                return new Block(block.title, block.sections.map((section: any) => {
                    switch (section.type) {
                        case 'text':
                            return new TextSection(section.content);
                        case 'code':
                            return new CodeSection(section.language || 'text', section.content);
                        default:
                            console.log('invalid section');
                            console.log(section)
                    }
                }).filter((section: any) => section != undefined));

            }

        }).filter((block: any) => block != undefined);

        return cheatySheet;
    }

}