const { APIRequestContext } = require('@playwright/test');

class APIClient {
  constructor() {
    this.baseURL = '';
    this.context = null;
    this.response = null;
    this.responseBody = null;
  }

  setBaseURL(url) {
    this.baseURL = url;
  }

  async initializeContext() {
    const playwright = require('@playwright/test').chromium;
    const browser = await playwright.launch();
    const context = await browser.createBrowserContext();
    this.context = context;
  }

  async cleanupContext() {
    if (this.context) {
      await this.context.close();
    }
  }

  async get(endpoint) {
    try {
      this.response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.responseBody = await this.response.json();
      return this.response;
    } catch (error) {
      throw new Error(`GET request failed: ${error.message}`);
    }
  }

  async post(endpoint, body) {
    try {
      this.response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      this.responseBody = await this.response.json();
      return this.response;
    } catch (error) {
      throw new Error(`POST request failed: ${error.message}`);
    }
  }

  async put(endpoint, body) {
    try {
      this.response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      this.responseBody = await this.response.json();
      return this.response;
    } catch (error) {
      throw new Error(`PUT request failed: ${error.message}`);
    }
  }

  async delete(endpoint) {
    try {
      this.response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.responseBody = await this.response.json().catch(() => null);
      return this.response;
    } catch (error) {
      throw new Error(`DELETE request failed: ${error.message}`);
    }
  }

  getStatusCode() {
    return this.response?.status;
  }

  getResponseBody() {
    return this.responseBody;
  }

  async getHeaders() {
    const headers = {};
    this.response?.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  }
}

module.exports = APIClient;
