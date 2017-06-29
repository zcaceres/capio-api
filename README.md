[![Stories in Ready](https://badge.waffle.io/zcaceres/capio-api.png?label=ready&title=Ready)](https://waffle.io/zcaceres/capio-api?utm_source=badge)
# Transcript Speech Recognition API with Capio
> Zach Caceres

Set up PG
CONFIG INSTRUCTIONS HERE

## Overview
This program provides a simple RESTful API to create and retrieve transcripts of audio files using the Capio.ai Speech Recognition API.

### Stack
Built with NodeJS and:
- *Express* for routing
- *PostgreSQL/Sequelize* for persisting transcriptions
- *Supertest/Mocha* for testing

## Installation
Config and dependencies here

## How To Use
You'll need [PostgreSQL](https://www.postgresql.org/download/) installed.

1. ```npm install``` dependencies using package.json
2. Add your PostGres username and password to the CONFIG.js file
3. Add your API key to the CONFIG.js file
4. You may need to set FORCE_DB_SYNC to true during your first run
5. ```npm start``` will launch your server

**To Create a Transcription:**
Send a POST request with an audio file to: http://localhost:8080/transcript

Your POST request needs the following parameters: {
  media: 'your_file_here',
  apiKey: 'your_api_key_here',
  async: true
}

**To retrieve a persistent transcription**
Send a GET request to /transcript with the transcription ID: http://localhost:8080/transcript/:transcriptionId

## Easy Testing with [Postman](https://www.getpostman.com/apps)
This repo includes four sample audio files for easy testing. They are labeled according to the lengt of the audio.

For easy testing, consider using Postman like the following:
![postman](./meta/Postman-request.png)

You should receive a response like this:
![postman](./meta/Postman-response.png)

## Unit Tests
To run tests, ```npm test``` from the directory that contains package.json

## Challenges and Opportunities for Improvement
I've left *TODOs* throughout the codebase to show things that I could have done better and opportunities to improve this code in a future push.

Here are a few:

*Testing:*
- Finish the test suite with enough time to do complete coverage. Specifically, must test Sequelize models more closely and check detailed responses from Capio and PostGres beyond status code.
- Testing revealed a design flaw in how I handled the response from Capio. I should have sent the user some indication that the request was still processing. Then, after the transcript came back, I could send them the text.

*Validation and Cleanup:*
- Validation uses a hacky approach to ensure audio files are sent to the server. Should check encoding rather than content header.
- No file cleanup is done after audio upload. This is not scalable at all.

*Error Handling:*
- There are many edge cases and potential areas for error that are not yet well handled
- In the event of an error or timeout while pinging Capio api, this program should retry the transcription several times before moving on
- Users could send binary files using x-www-form-urlencoded. These are not handled at all but could make it easier for developers to ping the API without encoding as multipart form data

*Other:*
- Transcript seems to occasionally cut off first or last words in each 'result' block. I'm not yet sure why.
- The 'long.mp3' media sample has never successfully returned a transcript. I dont yet know why.
- Refactoring to promisify response logic after POST request. Currently, the Express response is passed down through too many files and functions. This makes the flow hard to understand.
-
