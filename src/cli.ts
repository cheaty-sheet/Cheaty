#!/usr/bin/env node

import * as yargs from "yargs";
import {basename, extname, join} from "path";
import Render from "./lib/modules/renderers/Render.interface";
import YMLParser from "./lib/modules/parsers/YML.parser";
import * as mkdirp from "mkdirp";
import HTMLRenderer from "./lib/modules/renderers/HTMLRenderer/HTML.renderer";
import CheatySheet from "./lib/CheatySheet";
import {existsSync} from "fs";

yargs
    .command(['render <inputs...>', '*'], 'render the given input', (yargs) => {
        return yargs.positional('inputs', {
            describe: 'input(s) yaml file',
            type: 'string'
        }).option('o', {
            alias: 'output',
            demandOption: false,
            default: './',
            describe: 'output folder',
            type: 'string'
        })
    }, async (argv) => {
        const inputs: string[] = argv.inputs as unknown as string[];
        const output: string = argv.output as string;

        if (!existsSync(output)) {
            mkdirp.sync(output);
        }

        await Promise.all(inputs.map((input: string) => new YMLParser().parseFromDisk(input)
            .then((sheet: CheatySheet) => new HTMLRenderer().render(sheet)
                .then((html: Render) => {
                    const output = join(argv.output as string, basename(input, extname(input))) + '.html';
                    console.log(`Saving output in ${output}`);
                    html.saveToDisk(output)
                }))));
    })
    .help('h')
    .alias('h', 'help')
    .demandCommand()
    .argv;