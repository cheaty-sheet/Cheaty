export class PaperSizeError extends Error {

}

export class InvalidBlockError extends Error {

    constructor(block: { [key: string]: string }) {
        super(`${block} is invalid`);
    }
}