// @ts-ignore
import * as usfmjs from "usfm-js";
import Reference from "./Reference";
import AlignedSegment, {Token} from "./AlignedSegment";

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
                usfmObject.chapters[cId][vId] = alignVerse(usfmObject.chapters[cId][vId], segment);
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
            if (verseObj.text == token.text
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
 * Injects alignments into a verse
 * @param usfm
 * @param segment
 */
export function alignVerse(usfm: any, segment: AlignedSegment) {

    const unusedObjects = [];
    const alignedObjects: any = {};
    const usfmTokens = [];

    for (const objIndex of Object.keys(usfm.verseObjects)) {
        const obj = usfm.verseObjects[objIndex];
        obj.position = objIndex;
        if (obj.type !== "word") {
            unusedObjects.push(obj);
            continue;
        }
        usfmTokens.push(new Token(obj.text, parseInt(obj.occurrence), parseInt(obj.occurrences)));
        const alignmentIndex = findAlignment(obj, segment);
        if (alignmentIndex >= 0) {
            // add to alignment
            if (!alignedObjects[alignmentIndex]) {
                alignedObjects[alignmentIndex] = {
                    content: getAlignmentTitle(segment, alignmentIndex),
                    tag: "zaln",
                    type: "milestone",
                    children: []
                };
            }
            alignedObjects[alignmentIndex].children.push(obj);
            alignedObjects[alignmentIndex].children.sort(verseObjectComparator);
        } else {
            // add to unused
            unusedObjects.push(obj);
        }
    }

    const alignedUSFM = [...unusedObjects, ...Object.keys(alignedObjects).map(key => alignedObjects[key])];
    alignedUSFM.sort(verseObjectComparator);
    cleanSortingKey(alignedUSFM);
    return alignedUSFM;
}

