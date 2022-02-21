Feature: Sign In
  As a User, I want to be able to sign into Membrane demo.

  Scenario: User visualizes Sign In page correctly.
    Given the user has navigated to Membrane Demo home page
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
