import CheatySheet from "../../../CheatySheet";
import Renderer from "../Renderer.interface";
import Render from "../Render.interface";
export default class HTMLRenderer implements Renderer {
    render(cheatySheet: CheatySheet, options?: object): Promise<Render>;
}
