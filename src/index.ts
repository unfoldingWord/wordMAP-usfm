import {alignUSFM3} from './Injector';
import * as fs from 'fs-extra';

/**
 * Reads data from files and writes the aligned USFM to a file.
 * @param {string} alignmentsFile - path to the alignments file
 * @param {string} usfmFile - path to the usfm file
 * @param {string} outputFile - path to the output usfm file
 */
module.exports.alignFiles = (alignmentsFile: string, usfmFile: string, outputFile: string) => {
    const alignments = fs.readFileSync(alignmentsFile).toString();
    const usfm = fs.readFileSync(usfmFile).toString();
    const alignmentsJson = JSON.parse(alignments);
    const alignedUSFM = alignUSFM3(alignmentsJson, usfm);
    fs.writeFileSync(outputFile, alignedUSFM);
};

/**
 * Aligns USFM and returns the result
 * @param {string} alignments
 * @param {string} usfm
 * @return {string}
 */
module.exports.align = (alignments: string, usfm: string) => {
    return alignUSFM3(JSON.parse(alignments), usfm);
};
