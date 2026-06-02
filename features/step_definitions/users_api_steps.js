const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const APIClient = require('../utils/api_client');
const assert = require('assert');

let apiClient;

Before(() => {
  apiClient = new APIClient();
});

After(async () => {
  await apiClient.cleanupContext();
});

Given('the API base URL is {string}', (url) => {
  apiClient.setBaseURL(url);
});

When('I send a GET request to {string}', async (endpoint) => {
  await apiClient.get(endpoint);
});

When('I send a POST request to {string} with body:', async (endpoint, docString) => {
  const body = JSON.parse(docString);
  await apiClient.post(endpoint, body);
});

When('I send a PUT request to {string} with body:', async (endpoint, docString) => {
  const body = JSON.parse(docString);
  await apiClient.put(endpoint, body);
});

When('I send a DELETE request to {string}', async (endpoint) => {
  await apiClient.delete(endpoint);
});

Then('the response status code should be {int}', (expectedStatus) => {
  const actualStatus = apiClient.getStatusCode();
  assert.strictEqual(
    actualStatus,
    expectedStatus,
    `Expected status ${expectedStatus} but got ${actualStatus}`
  );
});

Then('the response should contain a list of users', () => {
  const body = apiClient.getResponseBody();
  assert(Array.isArray(body), 'Response should be an array');
  assert(body.length > 0, 'Response array should not be empty');
  assert(body[0].id, 'User should have an id');
  assert(body[0].name, 'User should have a name');
});

Then('the response should contain user with id {int}', (userId) => {
  const body = apiClient.getResponseBody();
  assert(body.id === userId, `Expected user id ${userId} but got ${body.id}`);
  assert(body.name, 'User should have a name');
});

Then('the response should contain the created user data', () => {
  const body = apiClient.getResponseBody();
  assert(body.name, 'Response should contain name');
  assert(body.email, 'Response should contain email');
  assert(body.username, 'Response should contain username');
});

Then('the response should contain the updated user data', () => {
  const body = apiClient.getResponseBody();
  assert.strictEqual(body.name, 'Jane Doe', 'Name should be updated');
  assert.strictEqual(body.email, 'jane@example.com', 'Email should be updated');
  assert.strictEqual(body.username, 'janedoe', 'Username should be updated');
});
