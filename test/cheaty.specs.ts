import * as path from "path";
import CheatySheet from "../src/lib/CheatySheet";
import {existsSync, readFileSync, unlinkSync} from "fs";
import {expect} from "chai";

describe('CheatySheet', () => {
    it('should render html', async function () {
        const cheatySheet = await CheatySheet.parseFromDisk(path.join(__dirname, './resources/nginx.cheatsheet.yml'), 'YML');
        const html = await cheatySheet.render('HTML');
        const outputPath = path.join(__dirname,'./nginx.cheatsheet.html');
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