import * as fs from 'fs-extra';
import * as usfmjs from 'usfm-js';

export function toUSFM3(alignments: object, usfm: string): string {
    const usfmObject = usfmjs.toJSON(usfm);

    // TODO: add alignment data to usfm

    return usfmjs.toUSFM(usfmObject);
}
