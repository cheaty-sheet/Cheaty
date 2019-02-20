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
const path_1 = require("path");
const handlebars_1 = require("handlebars");
const CodeSection_1 = __importDefault(require("../../blocks/CodeSection"));
const TextSection_1 = __importDefault(require("../../blocks/TextSection"));
const fs = require('fs');
class HTMLRender {
    constructor(html) {
        this.html = html;
    }
    saveToDisk(path) {
        fs.writeFileSync(path, this.html);
    }
    toString() {
        return this.html;
    }
}
class HTMLRenderer {
    render(cheatySheet, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateHtml = fs.readFileSync(path_1.join(__dirname, "template.html")).toString();
            const style = fs.readFileSync(path_1.join(__dirname, "style.css")).toString();
            const template = handlebars_1.compile(templateHtml);
            let data = {
                style: style,
                title: cheatySheet.title,
                description: cheatySheet.description,
                size: cheatySheet.size,
                options: cheatySheet.options,
                blocks: cheatySheet.blocks.map(block => ({
                    title: block.title,
                    sections: block.sections.map(section => {
                        if (section instanceof CodeSection_1.default) {
                            return {
                                isCode: true,
                                language: section.language,
                                content: section.content
                            };
                        }
                        else if (section instanceof TextSection_1.default) {
                            return {
                                isText: true,
                                content: section.content
                            };
                        }
                        else {
                            return {
                                isUnsupported: true,
                                content: section.content
                            };
                        }
                    })
                }))
            };
            return new HTMLRender(template(data));
        });
    }
}
exports.default = HTMLRenderer;
//# sourceMappingURL=HTML.renderer.js.map