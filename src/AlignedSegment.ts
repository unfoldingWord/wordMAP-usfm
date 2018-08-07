import Lexer, {Token} from "wordmap-lexer";

/**
 * A comparator for sorting numbers
 * @param a
 * @param b
 */
function numberComparator(a: number, b: number): number {
    return a - b;
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
        if (json.tokens && json.tokens.length && typeof json.tokens[0] === "string") {
            sentence._tokens = Lexer.tokenizeWords(json.tokens);
        } else {
            for (const t of json.tokens) {
                sentence._tokens.push(new Token({text: t.text, occurrence: t.occurrence, occurrences: t.occurrences}));
            }
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
    readonly verified: boolean;

    /**
     *
     * @param sourceNgram
     * @param targetNgram
     * @param verified - indicates the alignment has been verified by a human
     */
    constructor(sourceNgram: number[], targetNgram: number[], verified: boolean) {
        this.sourceNgram = sourceNgram;
        this.targetNgram = targetNgram;
        this.verified = verified;
    }

    /**
     * Compares two alignments for sorting.
     * TRICKY: for usfm we sort alignments by the target language
     * @param a
     * @param b
     */
    static comparator(a: Alignment, b: Alignment): number {
        if (a.targetNgram.length && b.targetNgram.length) {
            return a.targetNgram[0] - b.targetNgram[0];
        }
        return 0;
    }
}

/**
 * Represents an aligned sentence
 */
class AlignedSegment {
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
     * Loads an aligned segment from json
     * @param json
     * @return {AlignedSegment}
     */
    static fromJson(json: any): AlignedSegment {
        const segment = new AlignedSegment();
        // TODO: eventually we will support n-resources
        // for now r0 is the source and r1 is the target
        const sourceJson = json.resources.r0;
        const targetJson = json.resources.r1;
        segment._source = Sentence.fromJson(sourceJson);
        segment._target = Sentence.fromJson(targetJson);
        for (const a of json.alignments) {
            segment._alignments.push(new Alignment(a.r0.sort(numberComparator), a.r1.sort(numberComparator), Boolean(a.verified)));
        }
        return segment;
    }

    /**
     * Returns the title of an alignment
     * @param index
     */
    public getAlignmentTitle(alignment: Alignment): string {
        return alignment.sourceNgram.map((i: number) => {
            return this.source.tokens[i].toString();
        }).join(" ");
    }
}

export default AlignedSegment;
