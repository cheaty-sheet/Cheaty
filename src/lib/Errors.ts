export class PaperSizeError extends Error {
    constructor() {
        super("Your paper size is invalid");
    }
}

export class InvalidBlockError extends Error {
    constructor(block: { [key: string]: string }) {
        super(`${block} is invalid`);
    }
}