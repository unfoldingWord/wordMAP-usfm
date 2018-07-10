/**
 * Represents a token within a sentence
 */
export class Token {
    readonly text: string;
    readonly occurrence: number;
    readonly occurrences: number;

    constructor(text: string, occurrence: number, occurrences: number) {
        this.text = text;
        this.occurrence = occurrence;
        this.occurrences = occurrences;
    }

    /**
     * Checks if this token equals another one.
     * @param {Token} token
     * @return {boolean}
     */
    equals(token: Token): boolean {
        return token.text === this.text && token.occurrence === this.occurrence && token.occurrences === this.occurrences;
    }
}

/**
 * Represents a sentence
 */
export class Sentence {

    private _text: string = "";

    get text() {
        return this._text;
    }

    private _tokens: Token[] = [];

    get tokens(): Token[] {
        return this._tokens;
    }

    private _context: string = "";

    get context() {
        return this._context;
    }

    /**
     * Loads a sentence from json
     * @param json
     * @return {Sentence}
     */
    static fromJson(json: any): Sentence {
        const sentence = new Sentence();
        for (const t of json.tokens) {
            sentence._tokens.push(new Token(t.text, t.occurrence, t.occurrences));
        }
        sentence._text = json.text;
        sentence._context = json.metadata.contextId;
        return sentence;
    }
}

/**
 * represents an alignment
 */
export class Alignment {
    readonly sourceNgram: number[];
    readonly targetNgram: number[];

    constructor(sourceNgram: number[], targetNgram: number[]) {
        this.sourceNgram = sourceNgram;
        this.targetNgram = targetNgram;
    }
}

/**
 * Represents an aligned sentence
 */
class AlignedSentence {
    private _source: Sentence = new Sentence();

    get source() {
        return this._source;
    }

    private _target: Sentence = new Sentence();

    get target() {
        return this._target;
    }

    private _alignments: Alignment[] = [];

    get alignments(): Alignment[] {
        return this._alignments;
    }

    /**
     * Loads an aligned sentence from json
     * @param json
     * @return {AlignedSentence}
     */
    static fromJson(json: any): AlignedSentence {
        const sentence = new AlignedSentence();
        sentence._source = Sentence.fromJson(json.source);
        sentence._target = Sentence.fromJson(json.target);
        for (const a of json.alignments) {
            sentence._alignments.push(new Alignment(a.sourceNgram, a.targetNgram));
        }
        return sentence;
    }
}

export default AlignedSentence;
