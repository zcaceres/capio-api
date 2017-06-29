const FAKE_TRANSCRIPT = {
  transcriptId: '5954846142ccec0018960c1a',
  transcriptBody: [{"result":[{"alternative":[{"raw_transcript":"yes","confidence":1,"transcript":"Yes.","speaker":"S1","words":[{"to":0.8700000047683716,"confidence":1,"from":0.05999999865889549,"word":"Yes."}]}],"final":true}],"result_index":0}]
}

const CAPIO_TEMP_API_K = '300aa92da5d547349d4836f66e957469'
const CAPIO_API_POST_URL = 'http://apidev.capio.ai/v1/speech/transcribe'
const CAPIO_API_GET_URL = 'http://apidev.capio.ai/v1/speech/transcript/'
const TIMEOUT_DURATON = 5000

module.exports = {FAKE_TRANSCRIPT
  , CAPIO_TEMP_API_K
  , CAPIO_API_GET_URL
  , CAPIO_API_POST_URL
  , TIMEOUT_DURATON}
