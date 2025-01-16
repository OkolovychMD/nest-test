
# OpenAI Text Generation API

## Overview
This API provides a backend service built with **Nest.js** and **TypeScript** to interact with the OpenAI API for text generation capabilities. The service supports rate limiting, proper error handling, and is designed to be scalable and efficient.

---

## Endpoints

### **POST /generate-text**
Generate text based on a given prompt.

#### **Request**
- **URL**: `http://localhost:3000/generate-text`
- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "prompt": "Write a poem about the sea."
  }
  ```

#### **Response**
- **200 OK**:
  ```json
  {
    "text": "The sea, a canvas of endless blue, 
Whispers secrets, ancient and true..."
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "statusCode": 400,
    "message": "Prompt is required"
  }
  ```
- **429 Too Many Requests**:
  ```json
  {
    "statusCode": 429,
    "message": "Rate limit exceeded. Try again in 15 seconds."
  }
  ```
- **502 Bad Gateway**:
  ```json
  {
    "statusCode": 502,
    "message": "OpenAI API error: [Error Details]"
  }
  ```

---

## Installation

### **Requirements**
- Node.js (v16 or later)
- npm or yarn

### **Steps**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd nest-openai-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the application:
   ```bash
   npm run start
   ```

---
