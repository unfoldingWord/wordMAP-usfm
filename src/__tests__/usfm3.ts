import USFM3Compiler from "../USFM3Compiler";

describe("usfm 3 conversion", () => {
    it("converts an array", () => {
        const compiler = new USFM3Compiler();
        const input = [
            {
                "alignments": [
                    {
                        "sourceNgram": [{"text": "Βίβλος"}],
                        "targetNgram": [{"text": "book"}]
                    },
                    {
                        "sourceNgram": [{"text": "γενέσεως"}],
                        "targetNgram": [{"text": "genealogy"}]
                    },
                    {
                        "sourceNgram": [{"text": "Ἰησοῦ"}],
                        "targetNgram": [{"text": "Jesus"}]
                    },
                    {
                        "sourceNgram": [{"text": "Χριστοῦ"}],
                        "targetNgram": [{"text": "Christ"}]
                    },
                    {
                        "sourceNgram": [{"text": "υἱοῦ"}],
                        "targetNgram": [{"text": "son"}, {"text": "of"}]
                    }
                ]
            }
        ];
        const result = compiler.run(input);
        expect(result).toEqual(`\\zaln-s | x-content="Βίβλος"
\\w book\\w*
\\zaln-e\\*
\\zaln-s | x-content="γενέσεως"
\\w genealogy\\w*
\\zaln-e\\*
\\zaln-s | x-content="Ἰησοῦ"
\\w Jesus\\w*
\\zaln-e\\*
\\zaln-s | x-content="Χριστοῦ"
\\w Christ\\w*
\\zaln-e\\*
\\zaln-s | x-content="υἱοῦ"
\\w son\\w*
\\w of\\w*
\\zaln-e\\*`);
    });

    it("converts a big array", () => {
        const compiler = new USFM3Compiler();
        const input = [
            {
                "alignments": [
                    {
                        "sourceNgram": [{"text": "Βίβλος"}],
                        "targetNgram": [{"text": "book"}]
                    },
                    {
                        "sourceNgram": [{"text": "γενέσεως"}],
                        "targetNgram": [{"text": "genealogy"}]
                    }
                ]
            },
            {
                "alignments": [
                    {
                        "sourceNgram": [{"text": "Ἰησοῦ"}],
                        "targetNgram": [{"text": "Jesus"}]
                    },
                    {
                        "sourceNgram": [{"text": "Χριστοῦ"}],
                        "targetNgram": [{"text": "Christ"}]
                    }
                ]
            },
            {
                "alignments": [
                    {
                        "sourceNgram": [{"text": "υἱοῦ"}],
                        "targetNgram": [{"text": "son"}, {"text": "of"}]
                    }
                ]
            }
        ];
        const result = compiler.run(input);
        expect(result).toEqual("book genealogy\n" +
            "Jesus Christ\n" +
            "son of");
    });

    it("converts an object", () => {
        const compiler = new USFM3Compiler();
        const input = {
            "alignments": [
                {
                    "sourceNgram": [{"text": "Βίβλος"}],
                    "targetNgram": [{"text": "book"}]
                },
                {
                    "sourceNgram": [{"text": "γενέσεως"}],
                    "targetNgram": [{"text": "genealogy"}]
                },
                {
                    "sourceNgram": [{"text": "Ἰησοῦ"}],
                    "targetNgram": [{"text": "Jesus"}]
                },
                {
                    "sourceNgram": [{"text": "Χριστοῦ"}],
                    "targetNgram": [{"text": "Christ"}]
                },
                {
                    "sourceNgram": [{"text": "υἱοῦ"}],
                    "targetNgram": [{"text": "son"}, {"text": "of"}]
                }
            ]
        };
        const result = compiler.run(input);
        expect(result).toEqual("book genealogy Jesus Christ son of");
    });
});
