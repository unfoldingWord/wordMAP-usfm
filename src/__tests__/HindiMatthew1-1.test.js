import {alignUSFM3} from "../Injector";

describe("to usfm", () => {
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
              "tokens": ["अब्राहम", "की", "सन्तान", "दाऊद", "की", "सन्तान", "यीशु", "मसीह", "की","वंशावली।"],
              "text": "अब्राहम की सन्तान दाऊद की सन्तान यीशु मसीह की वंशावली।",
              "metadata": {
                "contextId": 40001001
              }
            },
            "r0": {
              "tokens": ["βίβλος", "γενέσεως", "Ἰησοῦ", "Χριστοῦ", "υἱοῦ", "Δαυεὶδ", "υἱοῦ", "Ἀβραάμ"],
              "text": "βίβλος γενέσεως Ἰησοῦ Χριστοῦ υἱοῦ Δαυεὶδ υἱοῦ Ἀβραάμ",
              "metadata": {
                "contextId": 40001001
              }
            }
          },
          "alignments": [
            {
              "r1": [8, 1, 4],
              "score": 0,
              "r0": [],
              "verified": false
            },
            {
              "r1": [7],
              "score": 0,
              "r0": [3],
              "verified": false
            },
            {
              "r1": [3],
              "score": 0,
              "r0": [5],
              "verified": false
            },
            {
              "r1": [9],
              "score": 0,
              "r0": [1, 0],
              "verified": false
            },
            {
              "r1": [6],
              "score": 0,
              "r0": [2],
              "verified": false
            },
            {
              "r1": [0],
              "score": 0,
              "r0": [7],
              "verified": false
            },
            {
              "r1": [2],
              "score": 0,
              "r0": [4],
              "verified": false
            },
            {
              "r1": [5],
              "score": 0,
              "r0": [6],
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
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="βίβλος"
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
\\zaln-e\\*,
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="2" x-content="υἱοῦ"
\\w son|x-occurrence="1" x-occurrences="2"\\w*
\\w of|x-occurrence="3" x-occurrences="4"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Δαυεὶδ"
\\w David|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*,
\\zaln-s | x-verified="false" x-occurrence="2" x-occurrences="2" x-content="υἱοῦ"
\\w son|x-occurrence="2" x-occurrences="2"\\w*
\\w of|x-occurrence="4" x-occurrences="4"\\w*
\\zaln-e\\*
\\zaln-s | x-verified="false" x-occurrence="1" x-occurrences="1" x-content="Ἀβραάμ"
\\w Abraham|x-occurrence="1" x-occurrences="1"\\w*
\\zaln-e\\*.
`;
    expect(alignUSFM3(alignments, usfm)).toEqual(expected);
  });
});
