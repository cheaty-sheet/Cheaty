import Block from "../src/lib/modules/blocks/Block";
import CodeSection from "../src/lib/modules/blocks/CodeSection";
import YMLParser from "../src/lib/modules/parsers/YML.parser";

describe('Parser', () => {
    describe('YML', () => {
        it('should parse YML', async () => {
            const path = "test/resources/nginx.cheatsheet.yml";
            const sheet = await new YMLParser().parseFromDisk(path);

            expect(sheet.blocks.length).toBe(10);
            expect(sheet.title).toBe("NGINX");
            expect(sheet.description).toBe("test");

            sheet.blocks.forEach((block: Block) => {
                expect(block).toHaveProperty(
                    "title");
                expect(block).toHaveProperty(
                    "sections");
                block.sections.forEach((section: any) => {
                    expect(section).toBeInstanceOf(CodeSection);
                    expect(section).toHaveProperty(
                        "language");
                    expect(section).toHaveProperty(
                        "content");
                })
            })
        });
    });
});