Feature: Login API
  As a User, I want to be able to consume data from the Login endpoint

  Scenario: User makes a valid request to Login endpoint
    Given the user has make a request with valid data to "Login" endpoint
    Then the user visualizes response code 200
    And the user visualizes a correct response data
