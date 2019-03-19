import {expect} from "chai";
import Block from "../src/lib/modules/blocks/Block";
import CodeSection from "../src/lib/modules/blocks/CodeSection";
import YMLParser from "../src/lib/modules/parsers/YML.parser";

describe('Parser', () => {
    describe('YML', () => {
        it('should parse YML', async () => {
            const path = "test/resources/nginx.cheatsheet.yml";
            const sheet = await new YMLParser().parseFromDisk(path);

            expect(sheet.blocks.length).equals(10);
            expect(sheet.title).equals("NGINX");
            expect(sheet.description).equals("test");

            sheet.blocks.forEach((block: Block) => {
                expect(block).haveOwnProperty("title").not.empty;
                expect(block).haveOwnProperty("sections").not.empty;
                block.sections.forEach((section: any) => {
                    expect(section).instanceOf(CodeSection);
                    expect(section).haveOwnProperty("language").not.empty;
                    expect(section).haveOwnProperty("content").not.empty;
                })
            })
        });
    });
});