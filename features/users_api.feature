Feature: User API CRUD Operations
  As an API consumer
  I want to perform CRUD operations on users
  So that I can manage user data through the API

  Background:
    Given the API base URL is "https://jsonplaceholder.typicode.com"

  Scenario: Get all users
    When I send a GET request to "/users"
    Then the response status code should be 200
    And the response should contain a list of users

  Scenario: Get a specific user
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response should contain user with id 1

  Scenario: Create a new user
    When I send a POST request to "/users" with body:
      """
      {
        "name": "John Doe",
        "email": "john@example.com",
        "username": "johndoe"
      }
      """
    Then the response status code should be 201
    And the response should contain the created user data

  Scenario: Update an existing user
    When I send a PUT request to "/users/1" with body:
      """
      {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "username": "janedoe"
      }
      """
    Then the response status code should be 200
    And the response should contain the updated user data

  Scenario: Delete a user
    When I send a DELETE request to "/users/1"
    Then the response status code should be 200
