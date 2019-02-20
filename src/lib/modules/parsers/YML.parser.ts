import CheatySheet from "../../CheatySheet";
import Parser from "./Parser.interface";
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

        cheatySheet.blocks = definition.blocks;

        return cheatySheet;
    }

}