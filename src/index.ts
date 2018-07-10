import {alignUSFM3} from './Injector';
import * as fs from 'fs-extra';

/**
 * Injects wordMAP alignments into a USFM file.
 * @param {string} alignmentsFile - path to the alignments file
 * @param {string} usfmFile - path to the usfm file
 * @param {string} output - path to the output usfm file
 */
module.exports.alignFiles = (alignmentsFile: string, usfmFile: string, output: string) => {
    const alignments = fs.readFileSync(alignmentsFile).toString();
    const usfm = fs.readFileSync(usfmFile).toString();
    const alignmentsJson = JSON.parse(alignments);
    const alignedUSFM = alignUSFM3(alignmentsJson, usfm);
    fs.writeFileSync(output, alignedUSFM);
};

module.exports.align = alignUSFM3;
