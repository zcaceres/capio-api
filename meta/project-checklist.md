# RESTFUL Backend for Capio Speech API

## Specs
- POST api at /transcripts
  - Accepts multipart POST requests with media files
  - Transcribes using the Capio Sync API (https://capio.readme.io/docs/transcription-rest-api)
  - Validate if uploaded file is media
  - Returns ONLY transcript text and the request ID, not the raw response
  - Results of each transcription request should be persisted (PostgreSQL) as request ID and text
- GET api at /transcripts/:id
  - Retrieve transcripts via ID
- Fully tested endpoints
- Readme
  - install dependencies
  - bootup server
  - run tests

## Capio API
To use Capio APIs, use API key “196502576af047df9864d3d05a05c785”
API endpoint - ‘https://apidev.capio.ai/v1/speech/transcribe‘

## Components
*Git* for Repo
*PostgreSQL* for persisting transcriptions
*Express* for HTTP routing
*NodeJS* for media validation
*Jasmine/Chai* for testing
*Docker* for deployment

If I have time:
*React* for front-end

## Project Quality Checklist

1. Have you read the spec VERY CAREFULLY, THREE TIMES?
2. Does this have enough tests? And does it pass the tests?
3. Does this work the way it's intended?
4. Does the git repo reflect well-managed PRs and good labeling of PRs?
5. Is 'use strict' in each file?
6. Included a .gitignore?
7. Included a .eslintrc.json?
8. Have you gone over each section with the clean code guidelines?
9. Is there one abstract 'main method' with all work delegated to other methods?
10. Does it include a Readme?
11. Does it cover weird edge cases where input is not expected?

README:
- linter
- dependencies
- code coverage badge
- function signatures
- API
- clear explanation of how it works
- continuous integration?
