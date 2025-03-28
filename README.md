# Mini Data Query Simulation Engine

## Overview
A lightweight REST API that simulates an AI-powered data query system with natural language processing capabilities.

## Prerequisites
- Node.js (v14+ recommended)
- npm

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application
     `npm start`

## API Endpoints

### 1. Query Endpoint
- **URL:** `/api/query`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "apiKey": "demo_key_1234",
    "query": "Show users from USA"
  }
  ```
- **Supported Queries:**
  - "Show all users"
  - "Show active users"
  - "Show users from USA"
  - "Show electronics products"

### 2. Explain Endpoint
- **URL:** `/api/explain`
- **Method:** GET
- **Query Param:** `query`
- **Example:** `/api/explain?query=Show users from USA&apiKey=demo_key_1234`

### 3. Validate Endpoint
- **URL:** `/api/validate`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "apiKey": "demo_key_1234",
    "query": "Show users from USA"
  }
  ```

## Authentication
- API Key required for all endpoints
- Valid API Keys: 
  - `demo_key_1234`
  - `test_key_5678`

## Error Handling
- Descriptive error messages
- Suggestions for valid queries

## Testing with Curl
```bash
# Query Endpoint
curl -X POST http://localhost:3000/api/query \
     -H "Content-Type: application/json" \
     -d '{"apiKey":"demo_key_1234","query":"Show users from USA"}'

# Explain Endpoint
curl "http://localhost:3000/api/explain?query=Show users from USA&apiKey=demo_key_1234"

# Validate Endpoint
curl -X POST http://localhost:3000/api/validate \
     -H "Content-Type: application/json" \
     -d '{"apiKey":"demo_key_1234","query":"Show users from USA"}'
```

## Future Improvements
- Expand natural language processing capabilities
- Add more complex query support
- Implement more sophisticated data filtering