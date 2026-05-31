Feature: OrangeHRM Login Page
  As an OrangeHRM user
  I want to log in to the application
  So that I can access the dashboard

  Scenario: Successful login with valid credentials
    Given user navigates to login page
    When user enters username "Admin"
    And user enters password "admin123"
    And user clicks login
    Then user should see dashboard
    And user should see "Performance" link

  Scenario: Login page displays correctly
    Given user navigates to login page
    Then user should see login form
    And username field should be visible
    And password field should be visible
