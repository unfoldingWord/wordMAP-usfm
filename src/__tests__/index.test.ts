import {toUSFM3} from "../index";

describe("to usfm", () => {
    it("has no usfm or alignment data", () => {
        const usfm = "";
        const alignments = {
            sentences: []
        };
        expect(toUSFM3(alignments, usfm)).toEqual(usfm);
    });

    it("has no alignment data", () => {
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

    it("aligns the entire verse", () => {
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
                    languageCode: "en"
                }
            },
            sentences: [
                {
                    target: {
                        tokens: tokenize("Speak of"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: tokenize("kaepS fo"),
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

    it("aligns part of the verse verse", () => {
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
                    languageCode: "en"
                }
            },
            sentences: [
                {
                    target: {
                        tokens: tokenize("Speak of"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: tokenize("kaepS"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0],
                            targetNgram: [0]
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
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        expect(toUSFM3(alignments, usfm)).toEqual(expected);
    });

    it("aligns several verses", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w Speak|x-occurrence="1" x-occurrences="1"\\w*
\\v 2
\\w of|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                target: {
                    languageCode: "en"
                }
            },
            sentences: [
                {
                    target: {
                        tokens: tokenize("Speak"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: tokenize("kaepS"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0],
                            targetNgram: [0]
                        }
                    ]
                },
                {
                    target: {
                        tokens: tokenize("of"),
                        metadata: {
                            contextId: "MAT001002"
                        }
                    },
                    source: {
                        tokens: tokenize("fo"),
                        metadata: {
                            contextId: "MAT001002"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0],
                            targetNgram: [0]
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

\\v 2
\\zaln-s | x-content="fo"
\\w of|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*

`;
        expect(toUSFM3(alignments, usfm)).toEqual(expected);
    });

    it("aligns multiple source tokens", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                target: {
                    languageCode: "en"
                }
            },
            sentences: [
                {
                    target: {
                        tokens: tokenize("hello"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: tokenize("olleh dlrow"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0, 1],
                            targetNgram: [0]
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
\\zaln-s | x-content="olleh dlrow"
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*

`;
        expect(toUSFM3(alignments, usfm)).toEqual(expected);
    });

    it("aligns multiple target tokens", () => {
        const usfm = `\\id TIT EN_ULB en_English_ltr Thu Jul 05 2018 15:43:08 GMT-0700 (PDT) tc
\\h Titus

\\s5
\\c 1
\\p
\\v 1
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\w world|x-occurrence="1" x-occurrences="1"\\w*
`;
        const alignments = {
            metadata: {
                target: {
                    languageCode: "en"
                }
            },
            sentences: [
                {
                    target: {
                        tokens: tokenize("hello world"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    source: {
                        tokens: tokenize("olleh"),
                        metadata: {
                            contextId: "MAT001001"
                        }
                    },
                    alignments: [
                        {
                            sourceNgram: [0],
                            targetNgram: [0, 1]
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
\\zaln-s | x-content="olleh"
\\w hello|x-occurrence="1" x-occurrences="1"\\w*
\\w world|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*

`;
        expect(toUSFM3(alignments, usfm)).toEqual(expected);
    });
});

/**
 * Tokenizes a string.
 * TRICKY: this will not properly handle occurrences.
 * @param str
 * @return {any[]}
 */
const tokenize = (str: string) => {
    const tokens = [];
    const words = str.trim().split(" ");
    for (const w of words) {
        tokens.push({
            text: w,
            occurrence: 1,
            occurrences: 1
        });
    }
    return tokens;
};
