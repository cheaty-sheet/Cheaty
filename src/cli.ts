#!/usr/bin/env node

import * as yargs from "yargs";
import CheatySheet from "./";
import {basename, extname} from "path";
import Render from "./lib/modules/renderers/Render.interface";
import YMLParser from "./lib/modules/parsers/YML.parser";
import HTMLRenderer from "./lib/modules/renderers/HTMLRenderer/HTML.renderer";

yargs
    .command(['render <inputs...>', '*'], 'render the given input', (yargs) => {
        return yargs.positional('inputs', {
            describe: 'input(s) yaml file',
            type: 'string'
        })
    }, async (argv) => {
        const inputs: string[] = argv.inputs as unknown as string[];

        await Promise.all(inputs.map((input: string) => new YMLParser().parseFromDisk(input)
            .then((sheet: CheatySheet) => new HTMLRenderer().render(sheet)
                .then((html: Render) => {
                    const output = basename(input, extname(input)) + '.html';
                    console.log(`Saving output in ${output}`);
                    html.saveToDisk(output)
                }))));
    })
    .help('h')
    .alias('h', 'help')
    .demandCommand()
    .argv;