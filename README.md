# FinTech Chatbot

A concise, **AI-driven** chatbot that leverages **Amazon Bedrock Knowledge Bases** for context-driven and accurate responses. This project uses a React frontend (hosted on AWS Amplify) with a Lambda backend (exposed via API Gateway) to provide real-time Q&A on finance and invoicing topics.

---

## Overview

- **Purpose**: Provide dynamic, knowledge-based answers using Amazon Bedrock's retrieval-augmented generation (RAG).
- **Architecture**:
  - **React UI**: A responsive, Markdown-rendered chat interface.
  - **API Gateway**: Routes requests from the frontend to Lambda.
  - **AWS Lambda**: Calls Amazon Bedrock to retrieve context and generate responses.
  - **Amazon Bedrock Knowledge Base**: Contains finance/invoice-related documents.
  - **AWS Amplify**: Hosts the React app with CI/CD from Git repository.

---

## Key Technologies

| Category       | Technology / Service                   |
|----------------|----------------------------------------|
| **Frontend**   | React, react-markdown, remark-gfm      |
| **Backend**    | AWS Lambda, API Gateway                |
| **AI/ML**      | Amazon Bedrock Knowledge Bases         |
| **Hosting**    | AWS Amplify                            |
| **Other**      | Node.js, IAM, S3 (for documents)       |

---

## How It Works

1. The user types a finance-related question in the React chatbot interface. The chat UI is designed to be responsive and Markdown-rendered, ensuring that responses are clear and well-formatted.
2. When the user submits a query, the React app sends a POST request to the API Gateway endpoint, passing the question in JSON format.
3. The API Gateway triggers an AWS Lambda function that processes the query. The function calls Amazon Bedrock using the `**retrieve_and_generate**` method, which searches a pre-configured knowledge base for relevant finance documents and generates a response using retrieval-augmented generation.
4. The Lambda function returns the generated answer to API Gateway, which then sends it back to the React app. The response is rendered in the chat window, with Markdown formatting applied for better readability.
5. Each new query is processed in real-time, allowing for a dynamic and interactive conversation that adapts based on the information stored in your knowledge base.

