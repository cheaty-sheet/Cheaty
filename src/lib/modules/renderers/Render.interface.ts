export default interface Render {
    toString(): string;
    saveToDisk(path: string): void;
}
