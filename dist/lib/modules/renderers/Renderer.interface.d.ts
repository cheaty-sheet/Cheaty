import Render from "./Render.interface";
import CheatySheet from "../../CheatySheet";
export default interface Renderer {
    render(cheatySheet: CheatySheet, options?: object): Promise<Render>;
}
