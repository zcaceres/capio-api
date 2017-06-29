[![Stories in Ready](https://badge.waffle.io/zcaceres/capio-api.png?label=ready&title=Ready)](https://waffle.io/zcaceres/capio-api?utm_source=badge)
# Transcript Speech Recognition API with Capio
> Zach Caceres

Badges and deployment link here

## Overview
Components and stack here
linter info here

## Installation
Config and dependencies here

## How To Use
Npm script here

## Testing
Testing info here

NodeJS Coding Challenge for Capio.ai using Capio's Speech System API

## Challenges and Opportunities for Improvement
- In the event of an error or timeout while pinging Capio api, transcript API should re-try transcription several times before moving on
- Raw binary file uploads using x-www-form-urlencoded could also be handled, making it easier for developers to ping the API without encoding as multipart form data
- Transcript seems to occasionally cut off first or last words in each 'result' block. I'm not sure why.
- Better design for passing down the Express response than currently, where it snakes through three files.
