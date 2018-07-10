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

## Roadmap

* Support extracting alignment data from USFM3. This will be useful when importing usfm into [tC](https://github.com/unfoldingWord-dev/translationCore).
* Support alignments that span verses
* Support alignments that span chapters
