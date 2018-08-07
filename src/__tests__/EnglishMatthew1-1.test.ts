import {alignUSFM} from "../Injector";

describe("align usfm2", () => {
    it("aligns the entire verse", () => {
        const usfm = `\\id MAT EN_ULT en_English_ltr Wed Aug 01 2018 20:45:11 GMT-0400 (EDT) tc
\\ide UTF-8
\\h Matthew
\\toc1 The Gospel of Matthew
\\toc2 Matthew
\\toc3 Mat
\\mt Matthew
\\s5
\\c 1
\\p
\\v 1 The book of the genealogy of Jesus Christ, son of David, son of Abraham.
`;

        const alignments = {
            "metadata": {
                "resources": {
                    "r0": {
                        "languageCode": "el-x-koine",
                        "name": "UGNT",
                        "version": "0.1"
                    },
                    "r1": {
                        "languageCode": "en",
                        "name": "ULT",
                        "version": "9"
                    }
                },
                "modified": "1524293704"
            },
            "conformsTo": "alignment-0.1",
            "segments": [
                {
                    "resources": {
                        "r0": {
                            "text": "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυὶδ υἱοῦ Ἀβραάμ.",
                            "tokens": ["Βίβλος", "γενέσεως", "Ἰησοῦ", "Χριστοῦ", "υἱοῦ", "Δαυὶδ", "υἱοῦ", "Ἀβραάμ"],
                            "metadata": {
                                "contextId": "MAT001001"
                            }
                        },
                        "r1": {
                            "text": "The book of the genealogy of Jesus Christ, son of David, son of Abraham:",
                            "tokens": ["The", "book", "of", "the", "genealogy", "of", "Jesus", "Christ", "son", "of", "David", "son", "of", "Abraham"],
                            "metadata": {
                                "contextId": "MAT001001"
                            }
                        },
                    },
                    "alignments": [
                        {
                            "score": 0.516905944153279,
                            "r0": [0],
                            "r1": [0, 1],
                            "verified": false
                        },
                        {
                            "score": 0.5363691430931895,
                            "r0": [1],
                            "r1": [3, 4],
                            "verified": false
                        },
                        {
                            "score": 0.5372550334365089,
                            "r0": [2],
                            "r1": [6],
                            "verified": false
                        },
                        {
                            "score": 0.4762634342491979,
                            "r0": [3],
                            "r1": [7],
                            "verified": false
                        },
                        {
                            "score": 0.46762244230161903,
                            "r0": [4],
                            "r1": [8, 9],
                            "verified": false
                        },
                        {
                            "score": 0.5253404588058129,
                            "r0": [5],
                            "r1": [10],
                            "verified": false
                        },
                        {
                            "r0": [6],
                            "r1": [11, 12],
                            "verified": true
                        },
                        {
                            "r0": [7],
                            "r1": [13],
                            "verified": true
                        }
                    ]
                }
            ]
        };

        const expected = `\\id MAT EN_ULT en_English_ltr Wed Aug 01 2018 20:45:11 GMT-0400 (EDT) tc
\\ide UTF-8
\\h Matthew
\\toc1 The Gospel of Matthew
\\toc2 Matthew
\\toc3 Mat
\\mt Matthew
\\s5
\\c 1
\\p
\\v 1
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Βίβλος"
\\w The|x-occurrence="1" x-occurrences="1"\\w*
\\w book|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w of|x-occurrence="1" x-occurrences="4"\\w*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="γενέσεως"
\\w the|x-occurrence="1" x-occurrences="1"\\w*
\\w genealogy|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w of|x-occurrence="2" x-occurrences="4"\\w*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w Jesus|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Χριστοῦ"
\\w Christ|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="2" x-content="υἱοῦ"
\\w son|x-occurrence="1" x-occurrences="2"\\w*
\\w of|x-occurrence="3" x-occurrences="4"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Δαυὶδ"
\\w David|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="2" x-occurrences="2" x-content="υἱοῦ"
\\w son|x-occurrence="2" x-occurrences="2"\\w*
\\w of|x-occurrence="4" x-occurrences="4"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἀβραάμ"
\\w Abraham|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });
});
