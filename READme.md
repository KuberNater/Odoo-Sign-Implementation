# Node.js Server API Documentation

This Node.js server acts as a backend bridge to interact with a custom Odoo addon API. It includes endpoints for creating sign requests via the Odoo API and receiving webhook callbacks from Odoo with verification.

---

## Overview

- **Stack:** Express.js with TypeScript
- **Functionality:**
    1. Create sign requests in Odoo with auto-generated payloads
    2. Receive and verify webhook data callbacks from Odoo

- **Security:** Webhook requests are verified using HMAC SHA256 signature checking based on a shared secret.

---

## API Endpoints

### GET /

- **Description:**  
  Basic sanity check endpoint to confirm server is working.

- **Request:**  
  `GET /`

- **Response:**  
  Status: 200 OK  
  Body: Plain text message  


---

### POST /api/sign/create

- **Description:**  
  Creates a sign request in the remote Odoo API. Generates a payload including a PDF (base64 encoded), user email, metadata JSON, and a secured webhook URL. Sends the payload to Odoo.

- **Request:**  
  `POST /api/sign/create`  
  No body required.

- **Response:**
- **Success (2xx):** JSON response from the Odoo API sign create endpoint.
- **Error:** Logs server error and returns no body response.

- **Notes:**  
  Uses internal helper `payloadGenerator` to construct the payload dynamically.

---

### POST /webhook/fetchdetails

- **Description:**  
  Webhook endpoint to receive callback data from Odoo. The webhook signature is verified before processing.

- **Request:**  
  `POST /webhook/fetchdetails`
- Headers: Content-Type: application/json
- Query parameter: `signature` (HMAC-SHA256 signature)
- Body: JSON webhook payload from Odoo

- **Middleware:**
- `verifyWebhook`: Verifies webhook authenticity by checking the HMAC signature based on request path, query params (excluding signature), and shared secret.

- **Response:**
- On success:  
  Status: 200 OK  
  Response body:
  ```
  {
    "message": "Webhook received",
    "success": true
  }
  ```
- On invalid or missing signature:  
  Status: 400 or 403 (Bad Request / Forbidden)  
  JSON error message returned.
- On internal errors:  
  Status: 500 Internal Server Error  
  JSON error message.

---

## Middleware

### verifyWebhook

- **Purpose:**  
  To authenticate incoming webhook requests by verifying the `signature` query parameter.

- **Mechanism:**  
  Uses SHA256 HMAC with a shared secret `"whothehellwasthat"` and computes signature from concatenation of request path and sorted query parameters excluding signature.

- **Response:**
- Proceeds to next middleware/handler if signature is valid.
- Returns error JSON if invalid or missing signature.

---

## Helpers

### payloadGenerator()

- Generates the payload for creating a sign request in Odoo.
- Returns an object containing:
- `name`: filename string
- `email`: user email string
- `pdf_base64`: base64 encoded PDF file content read from `pdf/250903114119.pdf`
- `filtered_json`: JSON data imported from a local file (`data`)
- `webhook_url`: Webhook URL with appended HMAC signature query parameter

### webhookUrl(url: string, secret: string): string

- Takes a URL and a secret, generates an HMAC SHA256 signature for the URL path and query, and appends the signature as a query parameter.
- Used to create secured webhook URLs for Odoo callbacks.

### base64Converter(filePath: string): string

- Reads a file from the specified path and converts its contents to a base64 encoded string.
- Used to encode PDF files for transmission in payloads.

---

## Environment Variables

- `PORT`: Port number to start the Node.js server. Defaults to `8000` if not specified.
- `CRYPTO_SECRET`: Secret used by crypto to add signature at end of the webhook URL for security.
- `ODOO_BASE_URL`: API endpoint of the Odoo where the API request will be made.


