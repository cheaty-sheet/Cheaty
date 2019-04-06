import Block from "./modules/blocks/Block";
import {PaperSizeError} from "./Errors";

interface OptionBlock {
    size?: string;
    highlightTheme?: string;
    logo?: string;
    watermark?: string;
    additionalStyle?: string;
    additionalStyleUrl?: string;
    replaceStyle?: string;
    replaceStyleUrl?: string;
    author?: string;
    fontSize?: number;
}

export class Options {
    public size: string = "A4";
    public highlightTheme: string = "github";
    public logo?: string;
    public watermark?: string;
    public additionalStyle?: string;
    public additionalStyleUrl?: string;
    public replaceStyle?: string;
    public replaceStyleUrl?: string;
    public author?: string;
    public fontSize?: number;

    constructor(options?: OptionBlock) {
        if (options) {
            if (options.size) this.size = options.size;
            if (options.highlightTheme) this.highlightTheme = options.highlightTheme;
            if (options.logo) this.logo = options.logo;
            if (options.watermark) this.watermark = options.watermark;
            if (options.additionalStyle) this.additionalStyle = options.additionalStyle;
            if (options.additionalStyleUrl) this.additionalStyleUrl = options.additionalStyleUrl;
            if (options.replaceStyle) this.replaceStyle = options.replaceStyle;
            if (options.replaceStyleUrl) this.replaceStyleUrl = options.replaceStyleUrl;
            if (options.fontSize) this.fontSize = options.fontSize;
            if (options.author) this.author = options.author;
        }
        this.validate()
    }

    private validate() {
        if (!RegExp("(A[3|4|5]|legal|letter)( landscape)?").test(this.size)) {
            throw new PaperSizeError()
        }
    }
}

export default class CheatySheet {
    constructor(public title: string = "Cheaty Sheet Cheat Sheet",
                public description: string = "A Cheat Sheet for Cheaty Sheet, by @CheatySheet.",
                public blocks: Block[] = [],
                public options: Options = new Options()) {
    }
}
