"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = __importDefault(require("./Section"));
class CodeSection extends Section_1.default {
    constructor(language, content) {
        super(content);
        this.language = language;
    }
}
exports.default = CodeSection;
//# sourceMappingURL=CodeSection.js.map