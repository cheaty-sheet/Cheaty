import * as path from "path";
import CheatySheet from "../src/lib/CheatySheet";
import {existsSync, readFileSync, unlinkSync} from "fs";
import {expect} from "chai";
import YMLParser from "../src/lib/modules/parsers/YML.parser";
import HTMLRenderer from "../src/lib/modules/renderers/HTMLRenderer/HTML.renderer";

describe('CheatySheet', () => {
    it('should render html', async function () {
        const cheatySheet = await new YMLParser().parseFromDisk(path.join(__dirname, './resources/nginx.cheatsheet.yml'));
        const html = await new HTMLRenderer().render(cheatySheet);
        const outputPath = path.join(__dirname, './nginx.cheatsheet.html');
        html.saveToDisk(outputPath);
        if (existsSync(outputPath)) {
            const content = readFileSync(outputPath).toString();
            expect(content)
                .contain('body')
                .contain('head')
                .contain('NGINX')
                .contain('client_max_body_size 10M');  // example in cheat sheet
            unlinkSync(outputPath);
        } else {
            throw Error('no cheat sheet saved')
        }
    });
});