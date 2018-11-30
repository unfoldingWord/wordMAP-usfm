import Alignment from "./Alignment";
import Sentence from "./Sentence";

/**
 * A comparator for sorting numbers
 * @param a
 * @param b
 */
function numberComparator(a: number, b: number): number {
    return a - b;
}

/**
 * Represents an aligned sentence/verse
 */
class AlignedSegment {

    /**
     * Loads an aligned segment from json
     * @param json
     * @return {AlignedSegment}
     */
    public static fromJson(json: any): AlignedSegment {
        const segment = new AlignedSegment();
        // TODO: eventually we will support n-resources
        // for now r0 is the source and r1 is the target
        const sourceJson = json.resources.r0;
        const targetJson = json.resources.r1;
        segment.sourceSentence = Sentence.fromJson(sourceJson);
        segment.targetSentence = Sentence.fromJson(targetJson);
        const alignedTargetTokens: number[] = [];
        const tokenAlignments: number[] = [];
        const alignments: Alignment[] = [];
        for (let i = 0, len = json.alignments.length; i < len; i++) {
            const a = json.alignments[i];
            const alignment = new Alignment(a.r0.sort(numberComparator), a.r1.sort(numberComparator), Boolean(a.verified));

            // filter out empty alignments
            if (alignment.targetNgram.length === 0 || alignment.sourceNgram.length === 0) {
                continue;
            }

            alignments.push(alignment);

            // keep track of aligned tokens for quick reference
            alignedTargetTokens.push.apply(alignedTargetTokens, alignment.targetNgram);
            for (const t of alignment.targetNgram) {
                tokenAlignments[t] = alignments.length - 1;
            }
        }
        segment.segmentAlignments = alignments;
        segment.alignedTargetTokens = alignedTargetTokens;
        segment.tokenAlignments = tokenAlignments;
        return segment;
    }

    private sourceSentence: Sentence = new Sentence();

    /**
     * Returns the source sentence
     */
    get source() {
        return this.sourceSentence;
    }

    private targetSentence: Sentence = new Sentence();

    /**
     * Returns the target sentence
     */
    get target() {
        return this.targetSentence;
    }

    private alignedTargetTokens: number[] = [];
    private tokenAlignments: number[] = [];

    /**
     * Returns an array of target tokens that have been aligned with the source text
     */
    get alignedTokens() {
        return this.alignedTargetTokens;
    }

    private segmentAlignments: Alignment[] = [];

    /**
     * Returns an array of alignments
     */
    get alignments(): Alignment[] {
        return this.segmentAlignments;
    }

    /**
     * Checks if a target token has been aligned
     * @param targetToken - the target token position
     */
    public isTokenAligned(targetToken: number): boolean {
        return this.alignedTargetTokens.indexOf(targetToken) >= 0;
    }

    /**
     * Returns the token's alignment
     * @param targetToken - the token position
     * @return the alignment position
     */
    public getTokenAlignmentIndex(targetToken: number): number {
        if (targetToken >= 0 && targetToken < this.tokenAlignments.length && this.tokenAlignments[targetToken] !== undefined) {
            return this.tokenAlignments[targetToken];
        } else {
            throw new Error("Invalid token index. You should check if the token is aligned first.");
        }
    }

    /**
     * Returns the title of an alignment
     * @param alignment
     */
    public getAlignmentTitle(alignment: Alignment): string {
        return alignment.sourceNgram.map((i: number) => {
            return this.source.tokens[i].toString();
        }).join(" ");
    }
}

export default AlignedSegment;
