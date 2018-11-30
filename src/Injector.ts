// @ts-ignore
import * as usfmjs from "usfm-js";
import {Token} from "wordmap-lexer";
import AlignedSegment from "./AlignedSegment";
import Alignment from "./Alignment";
import Reference from "./Reference";

/**
 * Injects alignment data into usfm
 * @param alignments - the alignment data to be merged into the usfm
 * @param {string} usfm - the usfm that needs alignment
 * @param {boolean} alignUnverified - include machine alignments.
 * @return {string} the aligned usfm
 */
export function alignUSFM(alignments: any, usfm: string, alignUnverified: boolean = true): string {
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
                try {
                    usfmObject.chapters[cId][vId] = alignSegment(segment, alignUnverified);
                } catch (e) {
                    console.error(`Error caught at ${cId}:${vId}`);
                    throw e;
                }
            } else {
                console.warn(`${reference} not found in usfm`);
            }
        }
    }

    return usfmjs.toUSFM(usfmObject);
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
 * Converts an aligned segment (verse) to usfm
 * @param segment - the segment to align
 * @param alignUnverified - include machine alignments.
 */
export function alignSegment(segment: AlignedSegment, alignUnverified: boolean = true) {

    const usfmObjects = [];
    let currentAlignmentIndex = -1;
    let milestoneQueue: any[] = [];

    /**
     * Macro thingy to close a milestone
     * @param alignmentIndex - the index of the alignment (milestone) being closed
     */
    const closeMilestone = (alignmentIndex: number) => {
        const alignment = segment.alignments[alignmentIndex];
        // TODO: cache the source tokens
        const sourceTokens = alignment.sourceNgram.map((j: number) => {
            return segment.source.requireToken(j);
        });
        const usfmObj = makeMilestone(sourceTokens, milestoneQueue, Boolean(alignment.verified), alignUnverified);
        usfmObjects.push(usfmObj);

        milestoneQueue = [];
    };

    // walk segment
    for (let i = 0, len = segment.target.length; i < len; i++) {
        const token = segment.target.requireToken(i);
        if (segment.isTokenAligned(i)) {
            const alignmentIndex = segment.getTokenAlignmentIndex(i);

            // close milestone
            if (currentAlignmentIndex !== alignmentIndex && milestoneQueue.length > 0) {
                closeMilestone(currentAlignmentIndex);
            }

            // build milestone
            currentAlignmentIndex = alignmentIndex;
            milestoneQueue.push(makeWord(token));
        } else {
            if (milestoneQueue.length > 0) {
                closeMilestone(currentAlignmentIndex);
                currentAlignmentIndex = -1; // TRICKY: full reset
            }

            // add un-aligned token
            usfmObjects.push(makeWord(token));
        }
    }

    // close milestone
    if (currentAlignmentIndex >= 0 && milestoneQueue.length > 0) {
        closeMilestone(currentAlignmentIndex);
    }
    return usfmObjects;
}

function makeWord(token: Token): any {
    return {
        occurrence: token.occurrence,
        occurrences: token.occurrences,
        text: token.toString(),
        type: "word"
    };
}

/**
 * Recursively generates a milestone
 * @param sourceTokens - the source tokens
 * @param children - the children of the milestone
 * @param verified - indicates if the alignment has been verified
 * @param alignUnverified - includes machine alignments
 */
function makeMilestone(sourceTokens: any[], children: any[], verified: boolean, alignUnverified: boolean = true): any {
    const keepMilestone = alignUnverified || verified;

    if (keepMilestone && sourceTokens && sourceTokens.length > 0) {
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
