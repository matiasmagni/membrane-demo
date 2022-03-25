Feature: Login API
  As a User, I want to be able to consume data from the Login endpoint


  Scenario: User makes a request with invalid data to Login endpoint
    Given the user has make a request with valid data to "Login" endpoint
    Then the user gets a 200 response code
    And the user gets a 401 error message "Wrong email or password, try again." from "Login" endpoint
