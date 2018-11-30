/**
 * represents an alignment
 */
export default class Alignment {

    /**
     * Compares two alignments for sorting.
     * TRICKY: for usfm we sort alignments by the target language
     * @param a
     * @param b
     */
    public static comparator(a: Alignment, b: Alignment): number {
        if (a.targetNgram.length && b.targetNgram.length) {
            return a.targetNgram[0] - b.targetNgram[0];
        }
        return 0;
    }

    public readonly sourceNgram: number[];
    public readonly targetNgram: number[];
    public readonly verified: boolean;

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
     * Checks if this alignment contains the target token
     * @param token - the token position
     */
    public hasTargetToken(token: number): boolean {
        return this.targetNgram.indexOf(token) >= 0;
    }
}
