import USFM2Compiler from "../USFM2Compiler";

describe("usfm 2 conversion", () => {
    it("converts an array", () => {
        const compiler = new USFM2Compiler();
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
        expect(result).toEqual("book genealogy Jesus Christ son of");
    });

    it("converts a big array", () => {
        const compiler = new USFM2Compiler();
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
        const compiler = new USFM2Compiler();
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
