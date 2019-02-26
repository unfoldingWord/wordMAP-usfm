import {alignUSFM} from "../Injector";

describe("Support discontiguous words", () => {
    it("works", () => {
        const usfm = `\\id MAT
\\h मत्ती
\\toc1 मत्ती
\\toc2 मत्ती
\\mt मत्ती
\\c 1
\\v 1 \\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἀβραάμ"
\\w अब्राहम|x-occurrence="1" x-occurrences="1"\\w*\\w की|x-occurrence="1" x-occurrences="3"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="1" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Δαυεὶδ"
\\w दाऊद|x-occurrence="1" x-occurrences="1"\\w*\\w की|x-occurrence="2" x-occurrences="3"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="2" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="2" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w यीशु|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Χριστοῦ"
\\w मसीह|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w की|x-occurrence="3" x-occurrences="3"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="βίβλος"
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="γενέσεως"
\\w वंशावली|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-e\\*`;

        const alignments = {
            "segments": [
                {
                    "resources": {
                        "r0": {
                            "text": "βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυεὶδ υἱοῦ Ἀβραάμ",
                            "tokens": ["βίβλος", "γενέσεως", "Ἰησοῦ", "Χριστοῦ", "υἱοῦ", "Δαυεὶδ", "υἱοῦ", "Ἀβραάμ"],
                            "metadata": {"contextId": "MAT001001"}
                        },
                        "r1": {
                            "text": "अब्राहम की सन्तान दाऊद की सन्तान यीशु मसीह की वंशावली",
                            "tokens": ["अब्राहम", "की", "सन्तान", "दाऊद", "की", "सन्तान", "यीशु", "मसीह", "की", "वंशावली"],
                            "metadata": {"contextId": "MAT001001"},
                            "usfm": "\\id MAT\n\\h मत्ती\n\\toc1 मत्ती\n\\toc2 मत्ती\n\\mt मत्ती\n\\c 1\n\\s यीशु मसीह की वंशावली\n\\p\n\\v 1 अब्राहम की सन्तान, दाऊद की सन्तान, यीशु मसीह की वंशावली।\n\\p\n"
                        }
                    },
                    "alignments": [
                        {"score": 0, "r0": [4], "r1": [2], "verified": true},
                        {"score": 0, "r0": [6], "r1": [5], "verified": true},
                        {"score": 0, "r0": [2], "r1": [8, 6], "verified": true},
                        {"score": 0, "r0": [3], "r1": [7], "verified": true},
                        {"score": 0, "r0": [5], "r1": [4, 3], "verified": true},
                        {"score": 0, "r0": [7], "r1": [0, 1], "verified": true}
                    ]
                }
            ]
        };
        const expected = `\\id MAT
\\h मत्ती
\\toc1 मत्ती
\\toc2 मत्ती
\\mt मत्ती
\\c 1
\\v 1
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἀβραάμ"
\\w अब्राहम|x-occurrence="1" x-occurrences="1"\\w*
\\w की|x-occurrence="1" x-occurrences="3"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="1" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Δαυεὶδ"
\\w दाऊद|x-occurrence="1" x-occurrences="1"\\w*
\\w की|x-occurrence="2" x-occurrences="3"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="2" x-occurrences="2" x-content="υἱοῦ"
\\w सन्तान|x-occurrence="2" x-occurrences="2"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w यीशु|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Χριστοῦ"
\\w मसीह|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"
\\w की|x-occurrence="3" x-occurrences="3"\\w*
\\zaln-e\\*
\\w वंशावली|x-occurrence="1" x-occurrences="1"\\w*`;
        expect(alignUSFM(alignments, usfm)).toEqual(expected);
    });
});
