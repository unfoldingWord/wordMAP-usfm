import {toUSFM3} from '../index';

describe('to usfm', () => {
    it('has no usfm or alignment data', () => {
        const usfm = '';
        const alignments = {};
        expect(toUSFM3(alignments, usfm)).toEqual(usfm);
    });

    it('has no alignment data', () => {
        const usfm = `\\id REV unfoldingWord Literal Text
\\ide UTF-8
\\h Revelation
\\toc1 The Book of Revelation
\\toc2 Revelation
\\toc3 Rev
\\mt Revelation

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-content="Βίβλος"
\\w book|\\w*
\\zaln-e\\*
\\zaln-s | x-content="γενέσεως"
\\w genealogy|\\w*
\\zaln-e\\*
\\zaln-s | x-content="Ἰησοῦ"
\\w Jesus|\\w*
\\zaln-e\\*
\\zaln-s | x-content="Χριστοῦ"
\\w Christ|\\w*
\\zaln-e\\*
\\zaln-s | x-content="υἱοῦ"
\\w son|\\w*
\\w of|\\w*
\\zaln-e\\*
`;
        const alignments = {};
        expect(toUSFM3(alignments, usfm)).toEqual(usfm);
    });

    it('aligns the entire verse', () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 3
\\p
\\v 15
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        // TODO: build a sample alignment structure
        const alignments = {
            sentences: [
                {
                    source: {
                        tokens: [

                        ]
                    },
                    target: {
                        tokens: []
                    },
                    alignments: [
                        {
                            sourceNgram: [],
                            targetNgram: []
                        },
                        {
                            sourceNgram: [],
                            targetNgram: []
                        }
                    ]
                }
            ]
        };
        // TODO: update to contain expected data
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 3
\\p
\\v 15
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        expect(toUSFM3(alignments, usfm)).toEqual(usfm);
    });

    // TODO: test alignment for half the verse
    // TODO: test alignment across verses
    // TODO: test alignment across chapters
    // TODO: test alignment for multiple verses
});
