import Renderer from "./modules/renderers/Renderer.interface";
import Render from "./modules/renderers/Render.interface";
import HTMLRenderer from "./modules/renderers/HTML.renderer";

const renderers: { [key: string]: Renderer } = {
    HTML: new HTMLRenderer(),
};

export default class CheatySheet {
    title: string = 'Cheaty Sheet Cheat Sheet';
    description: string = 'A Cheat Sheet for Cheaty Sheet, by @CheatySheet.';
    blocks: object[] = [];
    options: object = {};

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
}
