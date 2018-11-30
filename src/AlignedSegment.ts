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
 * Represents an aligned sentence
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
        for (const a of json.alignments) {
            segment.segmentAlignments.push(new Alignment(a.r0.sort(numberComparator), a.r1.sort(numberComparator), Boolean(a.verified)));
        }
        return segment;
    }

    private sourceSentence: Sentence = new Sentence();

    get source() {
        return this.sourceSentence;
    }

    private targetSentence: Sentence = new Sentence();

    get target() {
        return this.targetSentence;
    }

    private segmentAlignments: Alignment[] = [];

    get alignments(): Alignment[] {
        return this.segmentAlignments;
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
