import Section from "./Section";
export default class CodeSection extends Section {
    language: string;
    constructor(language: string, content: string);
}
