import Renderer from "./modules/renderers/Renderer.interface";
import Render from "./modules/renderers/Render.interface";
import HTMLRenderer from "./modules/renderers/HTML.renderer";
import Parser from "./modules/parsers/Parser.interface";
import YMLParser from "./modules/parsers/YML.parser";
import Block from "./modules/blocks/Block";

const parsers: { [key: string]: Parser } = {
    YML: new YMLParser(),
};

const renderers: { [key: string]: Renderer } = {
    HTML: new HTMLRenderer(),
};

export default class CheatySheet {
    title: string;
    description: string;
    blocks: Block[] = [];
    options: object = {};

    constructor(title: string = "Cheaty Sheet Cheat Sheet",
                description: string = "A Cheat Sheet for Cheaty Sheet, by @CheatySheet.") {
        this.title = title;
        this.description = description;
    }


    async render(renderer: string | Renderer): Promise<Render> {
        let selectedRenderer: Renderer;
        if (typeof renderer === 'string') {
            selectedRenderer = renderers[renderer];
            if (!selectedRenderer) {
                throw new Error(`Unexpected Renderer type requested: ${renderer}.`);
            }
        } else {
            selectedRenderer = renderer;
        }

        return selectedRenderer.render(this);
    }

    static async parseFromDisk(path: string, parser: string | Parser): Promise<CheatySheet> {
        let selectedParser: Parser;
        if (typeof parser === 'string') {
            selectedParser = parsers[parser];
            if (!selectedParser) {
                throw new Error(`Unexpected Parser type requested: ${parser}.`);
            }
        } else {
            selectedParser = parser;
        }

        return selectedParser.parseFromDisk(path);
    }
}
