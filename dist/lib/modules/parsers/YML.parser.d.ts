import CheatySheet from "../../CheatySheet";
import Parser from "./Parser.interface";
export default class YMLParser implements Parser {
    parseFromDisk(path: string): Promise<CheatySheet>;
    parseFromString(string: string): Promise<CheatySheet>;
}
