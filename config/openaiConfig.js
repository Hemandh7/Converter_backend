const { Configuration, OpenAIApi } = require('openai')


const configuration = new Configuration({
  apiKey: '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',
})

const openai = new OpenAIApi(configuration)

module.exports = openai