import {Reference, toUSFM3} from '../index';

describe('to usfm', () => {
    it('has no usfm or alignment data', () => {
        const usfm = '';
        const alignments = {
            sentences: []
        };
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
        const alignments = {
            sentences: []
        };
        expect(toUSFM3(alignments, usfm)).toEqual(usfm);
    });

    it('aligns the entire verse', () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                target: {
                    languageCode: 'en'
                }
            },
            sentences: [
                {
                    target: {
                        tokens: [
                            {
                                text: "Speak",
                                occurrence: 1,
                                occurrences: 1
                            },
                            {
                                text: "of",
                                occurrence: 1,
                                occurrences: 1
                            }
                        ],
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: [
                            {
                                text: "kaepS",
                                occurrence: 1,
                                occurrences: 1
                            },
                            {
                                text: "fo",
                                occurrence: 1,
                                occurrences: 1
                            }
                        ],
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0],
                            targetNgram: [0]
                        },
                        {
                            sourceNgram: [1],
                            targetNgram: [1]
                        }
                    ]
                }
            ]
        };
        const expected = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-content="kaepS"
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-content="fo"
\\w of|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*

`;
        expect(toUSFM3(alignments, usfm)).toEqual(expected);
    });

    // TODO: test alignment for half the verse
    // TODO: test alignment across verses
    // TODO: test alignment across chapters
    // TODO: test alignment for multiple verses
});

describe('Reference', () => {
    it('parses a context', () => {
        const result = Reference.buildFromContext('MAT001001');
        expect(result.book).toEqual('MAT');
        expect(result.chapter).toEqual(1);
        expect(result.verse).toEqual(1);
    });

    it('parses a large context', () => {
        const result = Reference.buildFromContext('MAT123456');
        expect(result.book).toEqual('MAT');
        expect(result.chapter).toEqual(123);
        expect(result.verse).toEqual(456);
    });

    it('parses an invalid context', () => {
        expect(() => {
            Reference.buildFromContext('MAT')
        }).toThrow();
    });

    it('renders as a string', () => {
        const reference = new Reference('GEN', 1, 1);
        expect(reference.toString()).toEqual('GEN 1:1');
        expect(`${reference}`).toEqual('GEN 1:1');
    })
});
