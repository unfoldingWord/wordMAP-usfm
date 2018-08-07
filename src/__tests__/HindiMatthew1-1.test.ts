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
\\v 1 अब्राहम की सन्‍तान, दाऊद की सन्‍तान, यीशु मसीह की वंशावली।
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
                        "r1": {
                            "tokens": ["अब्राहम", "की", "सन्तान", "दाऊद", "की", "सन्तान", "यीशु", "मसीह", "की", "वंशावली।"],
                            "text": "अब्राहम की सन्तान दाऊद की सन्तान यीशु मसीह की वंशावली।",
                            "metadata": {
                                "contextId": "MAT001001"
                            }
                        },
                        "r0": {
                            "tokens": ["βίβλος", "γενέσεως", "Ἰησοῦ", "Χριστοῦ", "υἱοῦ", "Δαυεὶδ", "υἱοῦ", "Ἀβραάμ"],
                            "text": "βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυεὶδ υἱοῦ Ἀβραάμ",
                            "metadata": {
                                "contextId": "MAT001001"
                            }
                        }
                    },
                    "alignments": [
                        {
                            "r0": [],
                            "r1": [8, 1, 4],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [3],
                            "r1": [7],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [5],
                            "r1": [3],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [1, 0],
                            "r1": [9],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [2],
                            "r1": [6],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [7],
                            "r1": [0],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [4],
                            "r1": [2],
                            "score": 0,
                            "verified": false
                        },
                        {
                            "r0": [6],
                            "r1": [5],
                            "score": 0,
                            "verified": false
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
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Ἀβραάμ"
\\w अब्राहम|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w की|x-occurrence="1" x-occurrences="3"\\w*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="1" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Δαυεὶδ"
\\w दाऊद|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w की|x-occurrence="2" x-occurrences="3"\\w*
\\zaln-s | x-verified="false" x-occurrence="2" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="2" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w यीशु|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Χριστοῦ"
\\w मसीह|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\w की|x-occurrence="3" x-occurrences="3"\\w*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="βίβλος"
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="γενέσεως"
\\w वंशावली।|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-e\\*
`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });
});
