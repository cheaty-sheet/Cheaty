import {expect} from "chai"
import Block from "../src/lib/modules/blocks/Block";
import CheatySheet from "../src/lib/CheatySheet";
import TextSection from "../src/lib/modules/blocks/TextSection";
import CodeSection from "../src/lib/modules/blocks/CodeSection";
import MarkdownSection from "../src/lib/modules/blocks/MarkdownSection";

let cheaty: CheatySheet;

beforeEach(async () => {
    cheaty = new CheatySheet("Title", "Desc");

    cheaty.blocks.push(
        new Block("Foo",
            [
                new TextSection("Some text to render in the block."),
                new MarkdownSection(`First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the **second** column`),
                new CodeSection("nginx", `#standard HTTP protocol
server {
  listen 80;
  listen 443 ssl;
}`)
            ]),
        new Block("Bar",
            [
                new TextSection("Hello"),
                new CodeSection("kotlin", `class Customer                                  // 1

class Contact(val id: Int, var email: String)   // 2

fun main() {

    val customer = Customer()                   // 3
    
    val contact = Contact(1, "mary@gmail.com")  // 4

    println(contact.id)                         // 5
    contact.email = "jane@gmail.com"            // 6
}`)
            ])
    );
});

describe("Renderer", () => {
    it("should render html", async () => {
        const render = await cheaty.render('HTML');
        const html = await render.toString();
        // uncomment for debug saving file
        // fs.writeFileSync("/tmp/cheat.html", html);
        expect(html)
            .contain("Title")
            .contain('github.min.css')
            .contain("Desc")
            .contain("#standard HTTP protocol")
            .contain("Foo")
            .contain("Bar")
            .contain("Some text to render in the block.")
            .contain('<table>')
            .contain('<strong>')
            .contain('A4')
    });
    it('should render highlight theme', async function () {
        const sheet = new CheatySheet();
        sheet.options.highlight_theme = 'darkula';
        const render = await sheet.render('HTML');
        const html = await render.toString();

        expect(html)
            .contain('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/darkula.min.css')
    });
    it('should add style', async function () {
        const sheet = new CheatySheet();
        sheet.options.additional_style = '.foo {color:black;}';
        const render = await sheet.render('HTML');
        const html = await render.toString();

        expect(html)
            .contain('.foo {color:black;}')
            .contain('.content')
    });
    it('should replace style', async function () {
        const sheet = new CheatySheet();
        sheet.options.replace_style = '.foo {color:black;}';
        const render = await sheet.render('HTML');
        const html = await render.toString();

        expect(html)
            .contain('.foo {color:black;}')
            .not.contain('.content')
    });
    it('should have default size "A4"', async function () {
        const sheet = new CheatySheet();
        const render = await sheet.render('HTML');
        const html = await render.toString();

        expect(html)
            .contain('<body class="A4">')
    });
    it('should have size custom "A5 landscape"', async function () {
        const sheet = new CheatySheet();
        sheet.options.size = 'A5 landscape';
        const render = await sheet.render('HTML');
        const html = await render.toString();

        expect(html)
            .contain('<body class="A5 landscape">')
    });
});