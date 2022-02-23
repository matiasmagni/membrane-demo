Feature: Sign In
  As a User, I want to be able to sign into Membrane demo.

  Scenario: User visualizes Sign In page correctly
    Given the user has navigated to Membrane Demo "Home" page
    Then the user is redirected to a secured URL
    And the user is redirected to the "Sign In" page
    And the user visualizes "Sign In" page elements correctly
      | element              | type           | content              |
      | Logo                 | image          | membrane logo        |
      | Title                | text           | Sign In              |
      | Email                | text input     | Enter your email     |
      | Password             | password input | Insert your password |
      | Eye Icon             | SVG image      | eye                  |
      | Next Button          | button         | Next                 |
      | Sign Up Link         | text link      | Sign Up              |
      | Forgot Password Link | text link      | Forgot Password      |

  Scenario: User visualizes error messages after inputting invalid data
    Given the user has navigated to Membrane Demo "Sign In" page
    Then the user visualizes "Next" button is inactive
    When the user unfocus the "Email" field
    Then the user visualizes "This field is required" error message below the "Email" field
    When the user unfocus the "Password" field
    Then the user visualizes "This field is required" error message below the "Password" field
    When the user inputs invalid format data on the "Email" field
    Then the user visualizes "Invalid email format" error message below the "Email" field
    When the user fills all fields with wrong data
      | Email    | solanabasle+test@gmail.com |
      | Password | 123456                     |
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes "Wrong email or password, try again." on popup message
