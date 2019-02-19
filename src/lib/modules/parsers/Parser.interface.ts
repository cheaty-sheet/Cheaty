import CheatySheet from "../../CheatySheet.class";

export default interface Parser {
    parseFromDisk(path: string): Promise<CheatySheet>;
    parseFromString(string: string): Promise<CheatySheet>;
}
