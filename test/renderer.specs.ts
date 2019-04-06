import {expect} from "chai"
import Block from "../src/lib/modules/blocks/Block";
import CheatySheet from "../src/lib/CheatySheet";
import TextSection from "../src/lib/modules/blocks/TextSection";
import CodeSection from "../src/lib/modules/blocks/CodeSection";
import MarkdownSection from "../src/lib/modules/blocks/MarkdownSection";
import HTMLRenderer from "../src/lib/modules/renderers/HTMLRenderer/HTML.renderer";
import {fail} from "assert";

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
    describe("html", () => {
        it("should render html", async () => {
            const render = await new HTMLRenderer().render(cheaty);
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
        })
    });
    describe("theme", () => {
        it('should render highlight theme', async function () {
            cheaty.options.highlightTheme = 'darkula';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/darkula.min.css')
        })
    });
    describe("style", () => {
        it('should add style', async function () {
            cheaty.options.additionalStyle = '.foo {color:black;}';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('.foo {color:black;}')
                .contain('.content')
        });
        it('should replace style', async function () {
            const sheet = new CheatySheet();
            sheet.options.replaceStyle = '.foo {color:black;}';
            const render = await new HTMLRenderer().render(sheet);
            const html = await render.toString();

            expect(html)
                .contain('.foo {color:black;}')
                .not.contain('.content')
        });
        it('should add style url', async function () {
            cheaty.options.additionalStyleUrl = './style.css';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<link rel="stylesheet"' +
                    ' href="./style.css">')
                .contain('.content') // original style
        });
        it('should replace style url', async function () {
            cheaty.options.replaceStyleUrl = './style.css';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<link rel="stylesheet"' +
                    ' href="./style.css">')
                .not.contain('.content') // original style
        });
    });
    describe("size", () => {
        it('should have default size "A4"', async function () {
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<body class="A4">')
        });
        it('should have size custom "A5 landscape"', async function () {
            cheaty.options.size = 'A5 landscape';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<body class="A5 landscape">')
        });
    });
    describe("watermark", () => {
        it('should not render watermark"', async function () {
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .not.contain('<div class="watermark">')
        });
        it('should render watermark', async function () {
            cheaty.options.watermark = 'MY_WATERMARK';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<div class="watermark">')
                .contain('MY_WATERMARK')
        });
    });
    describe("logo", () => {
        it('should not render logo', async function () {
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .not.contain('<div class="logo">')
        });
        it('should render logo', async function () {
            cheaty.options.logo = 'MY_LOGO';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<div class="logo">')
                .contain('MY_LOGO')
        });
    });
    describe("footer", () => {
        it('should render author', async function () {
            cheaty.options.author = 'foo **bar**';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<div class="author">')
                .contain('foo <strong>bar</strong>')
        });
        it('should render author with link', async function () {
            cheaty.options.author = 'foo [bar](http://github.com)';
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .contain('<div class="author">')
                .contain('<a href="http://github.com">bar</a>')
        });
        it('should NOT render author', async function () {
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .not.contain('<div class="author">')
        });
    });
    describe("font-size", () => {
        it('should set blocks font-size in style', async function () {
            const size = 16;
            cheaty.options.fontSize = size;
            const render = await new HTMLRenderer().render(cheaty);
            const html = await render.toString();

            expect(html)
                .string(`.item { font-size: ${size}pt; }`, 'font-size is not rendered')
        });
    })
});