"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTML_renderer_1 = __importDefault(require("./modules/renderers/HTML.renderer"));
const renderers = {
    HTML: new HTML_renderer_1.default(),
};
class CheatySheet {
    constructor() {
        this.title = 'Cheaty Sheet Cheat Sheet';
        this.description = 'A Cheat Sheet for Cheaty Sheet, by @CheatySheet.';
        this.blocks = [];
        this.options = {};
    }
    render(renderer) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedRenderer;
            if (typeof renderer === 'string') {
                selectedRenderer = renderers[renderer];
                if (!selectedRenderer) {
                    throw new Error(`Unexpected Renderer type requested: ${renderer}.`);
                }
            }
            else {
                selectedRenderer = renderer;
            }
            return selectedRenderer.render(this);
        });
    }
}
exports.default = CheatySheet;
//# sourceMappingURL=CheatySheet.class.js.map