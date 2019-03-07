import CheatySheet from './lib/CheatySheet';
import YMLParser from "./lib/modules/parsers/YML.parser";
import HTMLRenderer from "./lib/modules/renderers/HTMLRenderer/HTML.renderer";

export = {
    CheatySheet: CheatySheet,
    parsers:{
        YMLParser: YMLParser
    },
    renderers:{
        HTMLRenderer: HTMLRenderer
    }
};
