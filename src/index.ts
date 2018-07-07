import * as usfmjs from "usfm-js";

/**
 * Represents a passage reference
 */
export class Reference {
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

export function toUSFM3(alignments: any, usfm: string): string {
    const usfmObject = usfmjs.toJSON(usfm);

    // TODO: add alignment data to usfm
    if(alignments) {
        for (const verseId of Object.keys(alignments.sentences)) {
            const verse = alignments.sentences[verseId];
            const reference = Reference.buildFromContext(verse.target.metadata.contextId);

            const cId = reference.chapter.toString();
            const vId = reference.verse.toString();

            // look up verse
            if (Object.keys(usfmObject.chapters).indexOf(cId) >= 0 && Object.keys(usfmObject.chapters[cId]).indexOf(vId) >= 0) {
                // apply alignments
                usfmObject.chapters[cId][vId] = alignVerse(usfmObject.chapters[cId][vId], verse);
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
 * @param verse
 * @return {number}
 */
function findAlignment(verseObj: any, verse: any): number {
    for(const alignmentIndex of Object.keys(verse.alignments)) {
        const alignment = verse.alignments[alignmentIndex];
        for (const tokenId of alignment.targetNgram) {
            const token = verse.target.tokens[tokenId];
            if(verseObj.text == token.text
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
    if(obj.children && obj.children.length) {
        return getVerseObjectSortKey(obj.children[0]);
    } else {
        return obj.position;
    }
}

/**
 * Injects alignments into a verse
 * @param usfm
 * @param verse
 */
export function alignVerse(usfm: any, verse: any) {
    // TODO: validate target tokens.
    // if the usfm tokens to not match the target tokens this is an exception!

    const unusedObjects = [];
    const alignedObjects: any = {};

    for(const objIndex of Object.keys(usfm.verseObjects)) {
        const obj = usfm.verseObjects[objIndex];
        obj.position = objIndex;
        if(obj.type !== "word") {
            unusedObjects.push(obj);
            continue;
        }
        const alignmentIndex = findAlignment(obj, verse);
        if(alignmentIndex >= 0) {
            // add to alignment
            if(!alignedObjects[alignmentIndex]) {
                alignedObjects[alignmentIndex] = {
                    content: getAlignmentTitle(verse, alignmentIndex),
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

    const alignedUSFM = [...unusedObjects, ...Object.keys(alignedObjects).map(key=>alignedObjects[key])];
    alignedUSFM.sort(verseObjectComparator);
    // TODO: remove sorting keys
    return alignedUSFM;
}
