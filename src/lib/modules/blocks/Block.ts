import Section from "./Section";

export default class Block {
    constructor(public title: string,
                public style: { [index: string]: string },
                public sections: Section[]) {
    }
}