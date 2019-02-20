import {expect} from "chai";
import {join} from "path"
import CheatySheet from "../src/lib/CheatySheet.class";

describe('YML Parser', () => {
    it('should parse YML', async () => {
        const path = join(__dirname, "resources/nginx.cheatsheet.yml");
        const sheet = await CheatySheet.parseFromDisk(path, "YML");

        expect(sheet.blocks.length).equals(10);
        expect(sheet.title).equals("NGINX");
        expect(sheet.description).equals("test");

        sheet.blocks.forEach((block: any)=>{
            expect(block).haveOwnProperty("title").not.empty;
            expect(block).haveOwnProperty("sections").not.empty;
            block.sections.forEach((section: any)=>{
                expect(section).haveOwnProperty("type").not.empty;
                expect(section).haveOwnProperty("language").not.empty;
                expect(section).haveOwnProperty("content").not.empty;
            })
        })
    });
});