import Renderer from "./modules/renderers/Renderer.interface";
import Render from "./modules/renderers/Render.interface";
import Parser from "./modules/parsers/Parser.interface";
import Block from "./modules/blocks/Block";
export default class CheatySheet {
    title: string;
    description: string;
    size: string;
    blocks: Block[];
    options: object;
    constructor(title?: string, description?: string, size?: string);
    render(renderer: string | Renderer): Promise<Render>;
    static parseFromDisk(path: string, parser: string | Parser): Promise<CheatySheet>;
}
