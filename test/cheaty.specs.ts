import * as path from "path";
import CheatySheet from "../src/lib/CheatySheet";
import {existsSync, readFileSync, unlinkSync} from "fs";
import {expect, fail} from "chai";

describe('yml to html', () => {
    it('should render html', async function () {
        const cheatySheet = await CheatySheet.parseFromDisk(path.join(__dirname, './resources/nginx.cheatsheet.yml'), 'YML');
        console.log(cheatySheet);
        const html = await cheatySheet.render('HTML');
        const outputPath = './nginx.cheatsheet.html';
        html.saveToDisk(path.join(__dirname, outputPath));
        if (existsSync(outputPath)) {
            const content = readFileSync(outputPath);
            expect(content)
                .contain('body')
                .contain('head')
                .contain('NGINX')
                .contain('client_max_body_size 10M');  // example in cheat sheet
            unlinkSync(outputPath);
        } else {
            fail()
        }
    });
});