import CheatySheet from "../src/lib/CheatySheet.class";
import {expect} from "chai"

let cheaty: CheatySheet;

beforeEach(async () => {
    cheaty = new CheatySheet("Title", "Desc");

    cheaty.blocks.push({
        title: 'Port (listen)',
        sections: [
            {
                type: 'code',
                language: 'nginx',
                content: `#standard HTTP protocol
server {
  listen 80;
  listen 443 ssl;
}`,
            },
            {
                type: 'text',
                content: `Some text to render in the block.`,
            }
        ]
    });
});

describe("HTML", () => {
    it("should render html", async () => {
        const render = await cheaty.render('HTML');
        const html = await render.toString();
        expect(html)
            .contain("Title")
            .contain("Desc")
            .contain("#standard HTTP protocol")
            .contain("Some text to render in the block.")
    })
});