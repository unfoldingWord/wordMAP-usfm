# word-map-usfm
This library provides utilities for injecting alignment data from [wordMAP](https://github.com/translationCoreApps/word-map) into USFM3.

## Usage

### From the command line:
```
npm i word-map-usfm -g
word-map-usfm --help
```

### As a module:
```
npm i word-map-usfm
```

```js
import {align} from 'word-map-usfm';
...
const alignedUSFM = align(alignmentData, usfmData);
```

## Input

### Alignment JSON Data Structure
The intent is to have a single file as input that allows full round trip conversion to USFM 3 without any loss.
One of the resources is intended to be the source/primary text, the second resource is the one that is the target language of the USFM file. The target language is what would typically be shown in the USFM file without any alignment data.

In theory the data structure is extensible to allow for other metadata per word or token and potentially more than two languages although that may not lend itself well to USFM.

#### Top level attributes
The top level attributes of the data structure are `conformsTo:String`, `metadata:Object`, and `segments:Array`.

```json
{
  "conformsTo": "alignment-0.1",
  "metadata": {...},
  "segments": [...]
}
```

#### conformsTo
The `conformsTo` attribute specifies which version of the spec was used for the generation of the alignment file. Over time we plan to make changes to the alignment specification and are using Semantic Versioning starting with version 0.1 for this release.

```"conformsTo": "alignment-0.1",```

#### metadata
The top level attribute `metadata` stores information about the content stored in the file.

```json
"metadata": {
    "modified": "1524293704",
    "resources": {...}
  },
```

##### metadata.modified
The `metadata.modified` attribute is a unix timestamp of the last modification of the file.
Any time an edit is made to the content of the file this timestamp should be updated so that users of the file can keep up with the latest version of the data.

```"modified": "1524293704"```

##### metadata.resources
The `metadata.resources` attribute is an object whose keys are the names of resources and the values are the metadata describing the resources. These keys/names are used later in the segments section of the file to specify which resource the respective content belongs to. The expected attributes for each resource are `languageCode:String`, `name:String`, and `version:String`. This information will be used in generating the headers of the USFM3 file output.

NOTES:
- One text will be specified as the language of the USFM file and the other will be aligned to it as USFM3 milestones.
- One of the resource's text of each segment will be used as the raw USFM string for the verse for USFM3 generation.
- The tokens in the corresponding segment of the other resource will be aligned to the tokens found in the raw string of the first.

```json
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
```

#### segments
The `segments` attribute is an array of individual segments of the resources grouped together at the aligned segment level.

```json
  "segments": [
    {
      "resources": {...},
      "alignments": [...]
    },
    {
      "resources": {...},
      "alignments": [...]
    },
    ...
  ]
```

##### segments[n].resources
The `segments[n].resources` attribute is an object of which the keys correspond to the keys in the `metadata.resources`. In the example below, `r0` and `r1` are the resource keys.

The values of the resource keys are an object whose attributes are `text:String`, `tokens:Array`, and `metadata:Object`.

- The `text` attribute holds the raw string of the segment.
- The `tokens` attribute is an array of individual tokens as strings.
  - Later spec revisions will include tokens represented as data objects.
- The `metadata` attribute is an object that holds data about the segment.
  - Currently only requires a `contextId` attribute that identifies where the segment belongs, such as the verse identifier.
  - Having `metadata.contextId` at each resource allows for alignments to exist between different versification systems.

```json
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
      }
```
##### segments[n].alignments
The `segments[n].alignments` attribute is an array of individual alignments between tokens of the resources at the same level.

Each alignment is an object with the attributes of `score:Float`, `verified:Boolean`, and the `[key]:Object` that correspond with the resources.

- The `score` attribute holds the confidence of this specific alignment generated by the alignment tool.
- The `verified` attribute holds the boolean of whether or not the alignment was generated or approved by a human.
- The remaining attributes hold an array of indexes that correspond to their string counterparts in the `segments[n].resources[key].tokens` in the respective `key` of the array.

The example below shows an alignment of the above tokens. Note that alignments to null can be represented as not being present at all. Optionally they can be represented as indexes on one side and an empty array on the other.

```json
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
```

The example below is fabricated to show many to many, many to one, one to many, one to one, none to many, one to none, one to many verified, and many to one verified in a respective order. The non-verified are machine aligned and verified are human aligned or confirmed.

```json
  "alignments": [
    {
      "score": 0.516905944153279,
      "r0": [0, 1],
      "r1": [1, 4],
      "verified": false
    },
    {
      "score": 0.5363691430931895,
      "r0": [1, 2],
      "r1": [4],
      "verified": false
    },
    {
      "score": 0.5372550334365089,
      "r0": [2],
      "r1": [6, 7],
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
      "r0": [],
      "r1": [8, 9],
      "verified": false
    },
    {
      "score": 0.5253404588058129,
      "r0": [5],
      "r1": [],
      "verified": true
    },
    {
      "r0": [6],
      "r1": [10, 12],
      "verified": true
    },
    {
      "r0": [7, 9],
      "r1": [13],
      "verified": true
    }
  ]
```

## Roadmap

* Support extracting alignment data from USFM3. This will be useful when importing usfm into [tC](https://github.com/unfoldingWord-dev/translationCore).
* Support alignments that span verses
* Support alignments that span chapters
