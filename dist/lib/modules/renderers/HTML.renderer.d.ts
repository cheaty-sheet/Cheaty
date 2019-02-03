import CheatySheet from "../../CheatySheet.class";
import Renderer from "./Renderer.interface";
import Render from "./Render.interface";
export default class HTMLRenderer implements Renderer {
    renderBlock(block: any, options?: object): string;
    render(cheatySheet: CheatySheet, options?: object): Promise<Render>;
}
