import Section from "./Section";

export default class Block {
    constructor(public title: string,
                public sections: Section[]) {
    }
}