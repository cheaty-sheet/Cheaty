import {expect} from "chai"
import Block from "../src/lib/modules/blocks/Block";
import CheatySheet from "../src/lib/CheatySheet";
import TextSection from "../src/lib/modules/blocks/TextSection";
import CodeSection from "../src/lib/modules/blocks/CodeSection";

let cheaty: CheatySheet;

beforeEach(async () => {
    cheaty = new CheatySheet("Title", "Desc");

    cheaty.blocks.push(
        new Block("Port (listen)",
            [
                new CodeSection("nginx", `#standard HTTP protocol
server {
  listen 80;
  listen 443 ssl;
}`),
                new TextSection("Some text to render in the block.")
            ])
    );
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