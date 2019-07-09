import * as path from "path";
import CheatySheet from "../src/lib/CheatySheet";
import {existsSync, readFileSync, unlinkSync} from "fs";
import YMLParser from "../src/lib/modules/parsers/YML.parser";
import HTMLRenderer from "../src/lib/modules/renderers/HTMLRenderer/HTML.renderer";

describe('CheatySheet', () => {
    test('should render html', async function () {
        const cheatySheet = await new YMLParser().parseFromDisk(path.join(__dirname, './resources/nginx.cheatsheet.yml'));
        const html = await new HTMLRenderer().render(cheatySheet);
        const outputPath = path.join(__dirname, './nginx.cheatsheet.html');
        html.saveToDisk(outputPath);
        if (existsSync(outputPath)) {
            const content = readFileSync(outputPath).toString();
            expect(content).toContain('body');
            expect(content).toContain('head');
            expect(content).toContain('NGINX');
            expect(content).toContain('client_max_body_size 10M');  // example in cheat sheet
            unlinkSync(outputPath);
        } else {
            throw Error('no cheat sheet saved')
        }
    });
});