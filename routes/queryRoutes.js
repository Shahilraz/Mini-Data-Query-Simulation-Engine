const express = require('express');
const { authenticateApiKey } = require('../middlewares/authMiddleware');
const QueryTranslator = require('../services/queryTranslator');
const QueryValidator = require('../services/queryValidator');

const router = express.Router();

// POST /query endpoint (remains the same)
router.post('/query', authenticateApiKey, (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Query is required',
        hint: 'Provide a natural language query in the request body' 
      });
    }

    // First validate the query
    const validationResult = QueryValidator.validateQuery(query);
    if (!validationResult.valid) {
      return res.status(400).json(validationResult);
    }

    const result = QueryTranslator.translateQuery(query);
    res.json(result);
  } catch (error) {
    res.status(400).json({ 
      error: error.message,
      ...QueryValidator.validateQuery(req.body.query)
    });
  }
});

// POST /validate endpoint now uses QueryValidator
router.post('/validate', authenticateApiKey, (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Query is required',
      hint: 'Provide a natural language query in the request body' 
    });
  }

  const validationResult = QueryValidator.validateQuery(query);
  const queryDetails = QueryValidator.extractQueryDetails(query);

  res.json({
    ...validationResult,
    queryDetails
  });
});

module.exports = router;
