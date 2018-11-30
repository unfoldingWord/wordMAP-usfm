import {alignUSFM} from "../Injector";

it("should not produce duplicate words", () => {
    const usfm = `\\id JAS
\\ide UTF-8
\\rem Copyright Information: Creative Commons Attribution-ShareAlike 4.0 License
\\h याकूब
\\toc1 याकूब
\\toc2 याकूब
\\toc3 jas
\\mt1 याकूब

\\c 1
\\v 17 क्योंकि हर एक अच्छा वरदान और हर एक उत्तम दान ऊपर ही से है, और ज्योतियों के पिता की ओर से मिलता है, जिसमें न तो कोई परिवर्तन हो सकता है, और न ही वह परछाई के समान बदलता है।
\\p
`;

    const alignments = {
        "conformsTo": "alignment-0.1",
        "segments": [
            {
                "resources": {
                    "r0": {
                        "tokens": [
                            "πᾶσα",
                            "δόσις",
                            "ἀγαθὴ",
                            "καὶ",
                            "πᾶσα",
                            "δώρημα",
                            "τέλειον",
                            "ἄνωθέν",
                            "ἐστιν",
                            "καταβαῖνον",
                            "ἀπὸ",
                            "τοῦ",
                            "Πατρὸς",
                            "τοῦ",
                            "φώτων",
                            "παρ’",
                            "ᾧ",
                            "οὐκ",
                            "ἔνι",
                            "παραλλαγὴ",
                            "ἢ",
                            "τροπῆς",
                            "ἀποσκίασμα"
                        ],
                        "metadata": {
                            "contextId": "JAS001017"
                        }
                    },
                    "r1": {
                        "tokens": [
                            "क्योंकि",
                            "हर",
                            "एक",
                            "अच्छा",
                            "वरदान",
                            "और",
                            "हर",
                            "एक",
                            "उत्तम",
                            "दान",
                            "ऊपर",
                            "ही",
                            "से",
                            "है,",
                            "और",
                            "ज्योतियों",
                            "के",
                            "पिता",
                            "की",
                            "ओर",
                            "से",
                            "मिलता",
                            "है,",
                            "जिसमें",
                            "न",
                            "तो",
                            "कोई",
                            "परिवर्तन",
                            "हो",
                            "सकता",
                            "है,",
                            "और",
                            "न",
                            "अदल-बदल",
                            "के",
                            "कारण",
                            "उस",
                            "पर",
                            "छाया",
                            "पड़ती",
                            "है।"
                        ],
                        "metadata": {
                            "contextId": "JAS001017"
                        },
                    }
                },
                "alignments": [
                    {
                        "score": 0,
                        "r0": [
                            17
                        ],
                        "r1": [
                            32,
                            24
                        ],
                        "verified": true
                    }
                ]
            }
        ],
        "metadata": {
            "modified": 1540459795,
            "resources": {
                "r0": {
                    "version": "0.1",
                    "languageCode": "Grk",
                    "name": "UGNT"
                },
                "r1": {
                    "version": "0.1",
                    "languageCode": "Hin",
                    "name": "IRV"
                }
            }
        }
    };

    const expectedUSFM = `\\id JAS
\\ide UTF-8
\\rem Copyright Information: Creative Commons Attribution-ShareAlike 4.0 License
\\h याकूब
\\toc1 याकूब
\\toc2 याकूब
\\toc3 jas
\\mt1 याकूब

\\c 1
\\v 17
\\zaln-s | x-verified="true" x-occurrence="1" x-occurrences="1" x-content="οὐκ"
\\w न|x-occurrence="1" x-occurrences="2"\\w*
\\w न|x-occurrence="2" x-occurrences="2"\\w*
\\zaln-e\\*
\\w अदल-बदल|x-occurrence="1" x-occurrences="1"\\w*
\\w के|x-occurrence="2" x-occurrences="2"\\w*
\\w कारण|x-occurrence="1" x-occurrences="1"\\w*
\\w उस|x-occurrence="1" x-occurrences="1"\\w*
\\w पर|x-occurrence="1" x-occurrences="1"\\w*
\\w छाया|x-occurrence="1" x-occurrences="1"\\w*
\\w पड़ती|x-occurrence="1" x-occurrences="1"\\w*
\\w है।|x-occurrence="1" x-occurrences="1"\\w*`;

    expect(alignUSFM(alignments, usfm)).toEqual(expectedUSFM);
});

it("should not truncate the verse", () => {
    const usfm = `\\id JAS
\\ide UTF-8
\\rem Copyright Information: Creative Commons Attribution-ShareAlike 4.0 License
\\h याकूब
\\toc1 याकूब
\\toc2 याकूब
\\toc3 jas
\\mt1 याकूब

\\c 1
\\v 17 क्योंकि हर एक अच्छा वरदान और हर एक उत्तम दान ऊपर ही से है, और ज्योतियों के पिता की ओर से मिलता है, जिसमें न तो कोई परिवर्तन हो सकता है, और न ही वह परछाई के समान बदलता है।
\\p
`;

    const alignments = {
        "conformsTo": "alignment-0.1",
        "segments": [
            {
                "resources": {
                    "r0": {
                        "tokens": [
                            "πᾶσα",
                            "δόσις",
                            "ἀγαθὴ",
                            "καὶ",
                            "πᾶσα",
                            "δώρημα",
                            "τέλειον",
                            "ἄνωθέν",
                            "ἐστιν",
                            "καταβαῖνον",
                            "ἀπὸ",
                            "τοῦ",
                            "Πατρὸς",
                            "τοῦ",
                            "φώτων",
                            "παρ’",
                            "ᾧ",
                            "οὐκ",
                            "ἔνι",
                            "παραλλαγὴ",
                            "ἢ",
                            "τροπῆς",
                            "ἀποσκίασμα"
                        ],
                        "metadata": {
                            "contextId": "JAS001017"
                        }
                    },
                    "r1": {
                        "tokens": [
                            "क्योंकि",
                            "हर",
                            "एक",
                            "अच्छा",
                            "वरदान",
                            "और",
                            "हर",
                            "एक",
                            "उत्तम",
                            "दान",
                            "ऊपर",
                            "ही",
                            "से",
                            "है,",
                            "और",
                            "ज्योतियों",
                            "के",
                            "पिता",
                            "की",
                            "ओर",
                            "से",
                            "मिलता",
                            "है,",
                            "जिसमें",
                            "न",
                            "तो",
                            "कोई",
                            "परिवर्तन",
                            "हो",
                            "सकता",
                            "है,",
                            "और",
                            "न",
                            "अदल-बदल",
                            "के",
                            "कारण",
                            "उस",
                            "पर",
                            "छाया",
                            "पड़ती",
                            "है।"
                        ],
                        "metadata": {
                            "contextId": "JAS001017"
                        },
                    }
                },
                "alignments": [
                ]
            }
        ],
        "metadata": {
            "modified": 1540459795,
            "resources": {
                "r0": {
                    "version": "0.1",
                    "languageCode": "Grk",
                    "name": "UGNT"
                },
                "r1": {
                    "version": "0.1",
                    "languageCode": "Hin",
                    "name": "IRV"
                }
            }
        }
    };

    const expectedUSFM = `\\id JAS
\\ide UTF-8
\\rem Copyright Information: Creative Commons Attribution-ShareAlike 4.0 License
\\h याकूब
\\toc1 याकूब
\\toc2 याकूब
\\toc3 jas
\\mt1 याकूब

\\c 1
\\v 17`;

    expect(alignUSFM(alignments, usfm)).toEqual(expectedUSFM);
});
