import CheatySheet from "../../CheatySheet.class";
import Renderer from "./Renderer.interface";
import Render from "./Render.interface";
const fs = require('fs');

class HTMLRender implements Render {
    saveToDisk(path: string): void {
        fs.writeFileSync(path, this.toString());
    }

    toString(): string {
        return '';
    }
}

export default class HTMLRenderer implements Renderer {
    async render(cheatySheet: CheatySheet): Promise<Render> {
        const htmlRender = new HTMLRender();

        return htmlRender;
    }
}