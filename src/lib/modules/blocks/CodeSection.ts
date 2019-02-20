import Section from "./Section";

export default class CodeSection extends Section {
    constructor(public language: string,
                content: string) {
        super(content);
    }
}