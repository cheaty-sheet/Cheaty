#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const CheatySheet_1 = __importDefault(require("./lib/CheatySheet"));
const path = __importStar(require("path"));
const path_1 = require("path");
yargs
    .command('render <inputs...>', 'render the given input', (yargs) => {
    return yargs.positional('inputs', {
        describe: 'input(s) yaml file',
        type: 'string'
    });
}, (argv) => __awaiter(this, void 0, void 0, function* () {
    const inputs = argv.inputs;
    const inputPaths = inputs.map(input => path.join(__dirname, input));
    yield Promise.all(inputPaths.map((input) => CheatySheet_1.default.parseFromDisk(input, 'YML')
        .then((sheet) => sheet.render('HTML')
        .then((html) => {
        const output = path_1.basename(input, path_1.extname(input)) + '.html';
        html.saveToDisk(output);
    }))));
}))
    .help('h')
    .alias('h', 'help')
    .demandCommand()
    .argv;
//# sourceMappingURL=cli.js.map