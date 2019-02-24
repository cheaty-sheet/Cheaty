import {expect} from "chai";
import {join} from "path"
import CheatySheet from "../src/lib/CheatySheet";
import Block from "../src/lib/modules/blocks/Block";
import CodeSection from "../src/lib/modules/blocks/CodeSection";

describe('YML Parser', () => {
    it('should parse YML', async () => {
        const path = "test/resources/nginx.cheatsheet.yml";
        const sheet = await CheatySheet.parseFromDisk(path, "YML");

        expect(sheet.blocks.length).equals(10);
        expect(sheet.title).equals("NGINX");
        expect(sheet.description).equals("test");

        sheet.blocks.forEach((block: Block) => {
            expect(block).haveOwnProperty("title").not.empty;
            expect(block).haveOwnProperty("sections").not.empty;
            console.log(block);
            block.sections.forEach((section: any) => {
                console.log(typeof section);
                expect(section).instanceOf(CodeSection);
                expect(section).haveOwnProperty("language").not.empty;
                expect(section).haveOwnProperty("content").not.empty;
            })
        })
    });
});