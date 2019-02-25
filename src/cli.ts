#!/usr/bin/env node

import * as yargs from "yargs";
import CheatySheet from "./";
import {basename, extname} from "path";
import Render from "./lib/modules/renderers/Render.interface";

yargs
    .command(['render <inputs...>', '*'], 'render the given input', (yargs) => {
        return yargs.positional('inputs', {
            describe: 'input(s) yaml file',
            type: 'string'
        })
    }, async (argv) => {
        const inputs: string[] = argv.inputs as unknown as string[];

        await Promise.all(inputs.map((input: string) => CheatySheet.parseFromDisk(input, 'YML')
            .then((sheet: CheatySheet) => sheet.render('HTML')
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