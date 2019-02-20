import CheatySheet from "../../CheatySheet";
export default interface Parser {
    parseFromDisk(path: string): Promise<CheatySheet>;
    parseFromString(string: string): Promise<CheatySheet>;
}
