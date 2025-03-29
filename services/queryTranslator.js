const { users, products } = require('../data/mockData');

class QueryTranslator {
  static translateQuery(query) {
    // Simple keyword-based natural language to pseudo-SQL translation
    const lowerQuery = query.toLowerCase();
    const translations = {
      'show all users': { 
        collection: 'users', 
        filter: () => users 
      },
      'show active users': { 
        collection: 'users', 
        filter: (data) => data.filter(user => user.active) 
      },
      'show users from usa': { 
        collection: 'users', 
        filter: (data) => data.filter(user => user.country === 'USA') 
      },
      'show electronics products': { 
        collection: 'products', 
        filter: (data) => data.filter(product => product.category === 'Electronics') 
      }
    };

    // Find the best matching translation
    const matchedTranslation = Object.entries(translations)
      .find(([key]) => lowerQuery.includes(key));

    if (matchedTranslation) {
      const [, { collection, filter }] = matchedTranslation;
      return {
        intent: `Query for ${collection}`,
        data: filter(collection === 'users' ? users : products)
      };
    }

    throw new Error('Unsupported query');
  }

  static explainQuery(query) {
    try {
      const explanation = this.translateQuery(query);
      return {
        intent: explanation.intent,
        parameters: this.extractParameters(query)
      };
    } catch (error) {
      return {
        error: error.message,
        suggestedQueries: [
          'Show all users',
          'Show active users', 
          'Show users from USA',
          'Show electronics products'
        ]
      };
    }
  }

  static extractParameters(query) {
    const lowerQuery = query.toLowerCase();
    const parameters = [];

    if (lowerQuery.includes('from')) {
      const match = lowerQuery.match(/from (\w+)/);
      if (match) {
        parameters.push(`country=${match[1].toUpperCase()}`);
      }
    }

    if (lowerQuery.includes('active')) {
      parameters.push('active=true');
    }

    return parameters.length ? parameters : ['No specific parameters'];
  }
}

module.exports = QueryTranslator;
