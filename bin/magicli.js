#!/usr/bin/env node

require('magicli')({
  validateRequiredParameters: true,
  commands: {
    alignFiles: {
      description: 'Reads alignment data from a file and injects it into a USFM3 file.',
      options: [
        {
          name: 'alignmentsFile',
          alias: 'a',
          description: 'Path to the wordMAP alignments file',
          type: 'String',
          required: true
        },
        {
          name: 'usfmFile',
          alias: 'u',
          description: 'Path to the USFM3 file',
          type: 'String',
          required: true
        },
        {
          name: 'outputFile',
          alias: 'o',
          description: 'Path to the output USFM3 file',
          type: 'String',
          required: true
        }]
    },
    align: {
      description: 'Injects raw alignment data into raw USFM data.',
      options: [
        {
          name: 'alignments',
          alias: 'a',
          description: 'The alignment data as a JSON string',
          type: 'String',
          required: true
        },
        {
          name: 'usfm',
          alias: 'u',
          description: 'The USFM3 data as a string',
          type: 'String',
          required: true
        }
      ]
    }
  }
});
