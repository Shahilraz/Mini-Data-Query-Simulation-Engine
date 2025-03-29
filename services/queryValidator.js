const { users, products } = require('../data/mockData');

class QueryValidator {
  // List of supported collections
  static supportedCollections = ['users', 'products'];

  // List of supported fields for each collection
  static supportedFields = {
    users: ['id', 'name', 'country', 'active', 'age'],
    products: ['id', 'name', 'category', 'price', 'inStock']
  };

  /**
   * Validate if the query can be processed
   * @param {string} query - Natural language query
   * @returns {Object} Validation result
   */
  static validateQuery(query) {
    if (!query || typeof query !== 'string') {
      return {
        valid: false,
        reason: 'Invalid query format',
        suggestedQueries: this.getSuggestedQueries()
      };
    }

    const lowerQuery = query.toLowerCase();

    // Check against known query patterns
    const validQueries = [
      'show all users',
      'show active users',
      'show users from usa',
      'show electronics products'
    ];

    const isValidQuery = validQueries.some(validQuery => 
      lowerQuery.includes(validQuery)
    );

    if (isValidQuery) {
      return {
        valid: true,
        reason: 'Query is supported by the system'
      };
    }

    return {
      valid: false,
      reason: 'Unsupported query type',
      suggestedQueries: this.getSuggestedQueries()
    };
  }

  /**
   * Get suggested queries for guidance
   * @returns {string[]} List of suggested queries
   */
  static getSuggestedQueries() {
    return [
      'Show all users',
      'Show active users', 
      'Show users from USA',
      'Show electronics products'
    ];
  }

  /**
   * Extract potential collection and fields from query
   * @param {string} query - Natural language query
   * @returns {Object} Extracted collection and fields
   */
  static extractQueryDetails(query) {
    const lowerQuery = query.toLowerCase();
    
    // Determine collection
    const collection = lowerQuery.includes('users') ? 'users' : 
                       lowerQuery.includes('products') ? 'products' : 
                       null;

    // Determine potential fields
    const fields = this.supportedFields[collection] || [];

    return {
      collection,
      fields,
      supportedFields: this.supportedFields
    };
  }
}

module.exports = QueryValidator;
