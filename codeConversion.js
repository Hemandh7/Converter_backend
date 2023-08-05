const openai = require('./config/openaiConfig');

const convertCode = async (req, res) => {
  const { code, language } = req.body;

  const codeConversion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Convert the following ${language} code:\n${code}`
      }
    ],
    max_tokens: 100
  });

  const convertedCode = codeConversion.data.choices[0].message;

  res.status(200).json({
    convertedCode: convertedCode
  });
};

const debugCode = async (req, res) => {
  const { code, language } = req.body;

  const debugInfo = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Debug the following ${language} code:\n${code}`
      }
    ],
    max_tokens: 100
  });

  const debugResults = debugInfo.data.choices[0].message;

  res.status(200).json({
    debugResults: debugResults
  });
};

const checkEfficiency = async (req, res) => {
  const { code, language } = req.body;

  const efficiencyCheck = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: `Check the efficiency of the following ${language} code:\n${code}`
      }
    ],
    max_tokens: 100
  });

  const efficiencyResults = efficiencyCheck.data.choices[0].message;

  res.status(200).json({
    efficiencyResults: efficiencyResults
  });
};

module.exports = { convertCode, debugCode, checkEfficiency };
