/**
 * Represents a passage reference
 */
class Reference {
    readonly book: string;
    readonly chapter: number;
    readonly verse: number;

    constructor(book: string, chapter: number, verse: number) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }

    static buildFromContext(contextId: string) {
        if (contextId.length !== 9) {
            throw new Error("Context id must be 9 characters long");
        }

        const book = contextId.substring(0, 3);
        const chapter = Number.parseInt(contextId.substring(3, 6));
        const verse = Number.parseInt(contextId.substring(6, 9));
        return new Reference(book, chapter, verse);
    }

    toString(): string {
        return `${this.book} ${this.chapter}:${this.verse}`;
    }
}

export default Reference;
