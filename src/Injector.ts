// @ts-ignore
import * as usfmjs from "usfm-js";
import Reference from "./Reference";
import AlignedSegment, {Alignment} from "./AlignedSegment";

/**
 * Injects alignment data into usfm
 * @param alignments
 * @param {string} usfm
 * @return {string} usfm3
 */
export function alignUSFM(alignments: any, usfm: string): string {
    const usfmObject = usfmjs.toJSON(usfm);

    if (alignments) {
        for (const verseId of Object.keys(alignments.segments)) {
            const segment = AlignedSegment.fromJson(alignments.segments[verseId]);
            const reference = Reference.buildFromContext(segment.target.context);

            const cId = reference.chapter.toString();
            const vId = reference.verse.toString();

            // look up verse
            if (Object.keys(usfmObject.chapters).indexOf(cId) >= 0 && Object.keys(usfmObject.chapters[cId]).indexOf(vId) >= 0) {
                // apply alignments
                usfmObject.chapters[cId][vId] = alignSegment(usfmObject.chapters[cId][vId], segment);
            } else {
                console.warn(`${reference} not found in usfm`);
            }
        }
    }

    return usfmjs.toUSFM(usfmObject);
}

/**
 * Looks up an alignment index
 * @param verseObj - the verse object used for the search
 * @param segment
 * @return {number}
 */
function findAlignment(verseObj: any, segment: AlignedSegment): number {
    for (const alignmentIndex of Object.keys(segment.alignments)) {
        const alignment = segment.alignments[parseInt(alignmentIndex)];
        for (const tokenId of alignment.targetNgram) {
            const token = segment.target.tokens[tokenId];
            if (verseObj.text === token.toString()
                && verseObj.occurrence == token.occurrence
                && verseObj.occurrences == token.occurrences) {
                return Number.parseInt(alignmentIndex);
            }
        }
    }
    return -1;
}

/**
 * Returns the title of the alignment source tokens
 * @param verse
 * @param {number} alignmentIndex
 * @return {string}
 */
function getAlignmentTitle(verse: any, alignmentIndex: number): string {
    return verse.alignments[alignmentIndex].sourceNgram.map((i: number) => {
        return verse.source.tokens[i].text;
    }).join(" ");
}

/**
 * Compares two numbers for sorting
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function numberComparator(a: number, b: number) {
    return a - b;
}

/**
 * Compares two verse objects for sorting
 * @param a
 * @param b
 * @return {number}
 */
function verseObjectComparator(a: any, b: any) {
    const aSort = getVerseObjectSortKey(a);
    const bSort = getVerseObjectSortKey(b);
    return numberComparator(aSort, bSort);
}

/**
 * Returns the key used for sorting the verse object
 * @param obj
 * @return {number}
 */
function getVerseObjectSortKey(obj: any): number {
    if (obj.children && obj.children.length) {
        return getVerseObjectSortKey(obj.children[0]);
    } else {
        return obj.position;
    }
}

/**
 * Removes the sorting key from the verse objects
 * @param verseObjects
 */
function cleanSortingKey(verseObjects: any) {
    for (const obj of verseObjects) {
        delete obj.position;
        if (obj.children) {
            cleanSortingKey(obj.children);
        }
    }
}

/**
 * Filters and sorts alignments
 * @param alignments
 */
function sanitizeAlignments(alignments: Alignment[]): Alignment[] {
    const cleaned = [];
    for (const a of alignments) {
        // skip empty alignments
        if (a.targetNgram.length === 0 || a.sourceNgram.length === 0) {
            continue;
        }
        cleaned.push(a);
    }
    return cleaned.sort(Alignment.comparator);
}

/**
 * Injects alignments into a verse
 * @param usfm
 * @param segment
 */
export function alignSegment(usfm: any, segment: AlignedSegment) {

    const usfmObjects = [];
    let lastTargetTokenPos: number = -1;
    const alignments = sanitizeAlignments(segment.alignments);

    // build usfm
    for (const alignment of alignments) {

        // skip empty alignments
        if(alignment.targetNgram.length === 0 || alignment.sourceNgram.length === 0) {
            continue;
        }

        // add un-aligned target tokens
        if (lastTargetTokenPos >= 0) {
            while (lastTargetTokenPos < alignment.targetNgram[0] - 1) {
                lastTargetTokenPos++;
                const token = segment.target.tokens[lastTargetTokenPos];
                usfmObjects.push({
                    occurrence: token.occurrence,
                    occurrences: token.occurrences,
                    text: token.toString(),
                    type: "word"
                });
            }
        }

        // collect aligned target tokens
        const children = [];
        for (const targetPos of alignment.targetNgram) {
            const token = segment.target.tokens[targetPos];
            children.push({
                occurrence: token.occurrence,
                occurrences: token.occurrences,
                text: token.toString(),
                type: "word"
            });
        }

        // build milestone(s)
        const sourceTokens = alignment.sourceNgram.map(i => segment.source.tokens[i]);
        const usfmObj = makeMilestone(sourceTokens, children, Boolean(alignment.verified));
        usfmObjects.push(usfmObj);

        lastTargetTokenPos = alignment.targetNgram[alignment.targetNgram.length - 1];
    }

    // add remaining un-aligned target tokens
    if (lastTargetTokenPos >= 0) {
        while (lastTargetTokenPos < segment.target.tokens.length - 1) {
            lastTargetTokenPos++;
            const token = segment.target.tokens[lastTargetTokenPos];
            usfmObjects.push({
                occurrence: token.occurrence,
                occurrences: token.occurrences,
                text: token.toString(),
                type: "word"
            });
        }
    }
    return usfmObjects;
}

/**
 * Recursively generates a milestone
 * @param sourceTokens - the source tokens
 * @param children - the children of the milestone
 * @param verified - indicates if the alignment has been verified
 */
function makeMilestone(sourceTokens: any[], children: any[], verified: boolean): any {
    if (sourceTokens.length) {
        const token = sourceTokens[0];
        return {
            verified,
            occurrence: token.occurrence,
            occurrences: token.occurrences,
            content: token.text,
            tag: "zaln",
            type: "milestone",
            children: makeMilestone(sourceTokens.slice(1), children, verified)
        };
    } else {
        return children;
    }
}
