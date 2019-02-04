import Renderer from "./modules/renderers/Renderer.interface";
import Render from "./modules/renderers/Render.interface";
import Parser from "./modules/parsers/Parser.interface";
export default class CheatySheet {
    title: string;
    description: string;
    blocks: object[];
    options: object;
    render(renderer: string | Renderer): Promise<Render>;
    static parseFromDisk(path: string, parser: string | Parser): Promise<CheatySheet>;
}
