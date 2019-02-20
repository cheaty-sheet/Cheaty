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
const CheatySheet_1 = __importDefault(require("../../CheatySheet"));
const fs = require('fs');
const yaml = require('js-yaml');
class YMLParser {
    parseFromDisk(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parseFromString(fs.readFileSync(path));
        });
    }
    parseFromString(string) {
        return __awaiter(this, void 0, void 0, function* () {
            const cheatySheet = new CheatySheet_1.default();
            const definition = yaml.safeLoad(string);
            cheatySheet.title = definition.title || 'Cheaty Sheet Cheat Sheet';
            cheatySheet.description = definition.description;
            cheatySheet.blocks = definition.blocks;
            return cheatySheet;
        });
    }
}
exports.default = YMLParser;
//# sourceMappingURL=YML.parser.js.map