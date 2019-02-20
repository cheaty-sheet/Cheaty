import {expect} from "chai"
import Block from "../src/lib/modules/blocks/Block";
import CheatySheet from "../src/lib/CheatySheet";
import TextSection from "../src/lib/modules/blocks/TextSection";
import CodeSection from "../src/lib/modules/blocks/CodeSection";
import * as fs from "fs"

let cheaty: CheatySheet;

beforeEach(async () => {
    cheaty = new CheatySheet("Title", "Desc");

    cheaty.blocks.push(
        new Block("Foo",
            [
                new TextSection("Some text to render in the block."),
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

describe("HTML", () => {
    it("should render html", async () => {
        const render = await cheaty.render('HTML');
        const html = await render.toString();
        // uncomment for debug saving file
        fs.writeFileSync("/tmp/cheat.html", html);
        expect(html)
            .contain("Title")
            .contain("Desc")
            .contain("#standard HTTP protocol")
            .contain("Foo")
            .contain("Bar")
            .contain("Some text to render in the block.")
    })
});