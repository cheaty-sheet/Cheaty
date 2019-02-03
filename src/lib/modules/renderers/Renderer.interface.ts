import Render from "./Render.interface";
import CheatySheet from "../../CheatySheet.class";

export default interface Renderer {
    render(cheatySheet: CheatySheet): Promise<Render>;
}
