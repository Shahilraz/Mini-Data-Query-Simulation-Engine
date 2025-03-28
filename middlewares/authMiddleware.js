
const { VALID_API_KEYS } = require('../config/apiKeys');

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.body.apiKey || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ 
      error: 'No API key provided',
      hint: 'Include apiKey in request body or query parameters' 
    });
  }

  if (!VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({ 
      error: 'Invalid API key',
      hint: 'Check your API key and try again' 
    });
  }

  next();
};

module.exports = { authenticateApiKey };