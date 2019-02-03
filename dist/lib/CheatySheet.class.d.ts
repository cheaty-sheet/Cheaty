import Renderer from "./modules/renderers/Renderer.interface";
import Render from "./modules/renderers/Render.interface";
export default class CheatySheet {
    title: string;
    description: string;
    blocks: object[];
    options: object;
    render(renderer: string | Renderer): Promise<Render>;
}
