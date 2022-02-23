Feature: Sign Up
  As a User, I want to be able to sign up on Membrane demo.

  Scenario: User visualizes Sign Up page correctly
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Sign Up" page elements correctly
      | element      | type         | content                    |
      | First Name   | input text   | Enter your first name here |
      | Last Name    | input text   | Enter your last name here  |
      | Email        | input email  | Enter your email here      |
      | Phone Number | dropdown     |                            |
      | Phone Number | input number |                            |
      | Next Button  | button       | Next                       |
      | Sign In Link | text link    | Already have an account?   |

  Scenario: User visualizes error messages after inputting invalid data
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Next" button is inactive
    When the user unfocus the "First Name" field
    Then the user visualizes "This field is required" error message below the "First Name" field
    When the user unfocus the "Last Name" field
    Then the user visualizes "This field is required" error message below the "Last Name" field
    When the user unfocus the "Email" field
    Then the user visualizes "This field is required" error message below the "Email" field
    When the user unfocus the "Phone Number" dropdown field
    Then the user visualizes "This field is required" error message below the "Phone Number" field
    When the user unfocus the "Phone Number" input field
    Then the user visualizes "This field is required" error message below the "Phone Number" field
    When the user inputs invalid format data on the "Email" field
    Then the user visualizes "Invalid email format" error message below the "Email" field

  Scenario: User completes sign up process after inputting valid data (Hybrid)
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Next" button is inactive
    When the user fills all fields with valid data
      | First Name            | Soledad                        |
      | Last Name             | Basle                          |
      | Email                 | solanabasle+new-test@gmail.com |
      | Phone Number Dropdown | Argentina                      |
      | Phone Number          | 2612535890                     |
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes "Please enter below the 6-digit security code. You will get it through EMAIL to your {address} email account."
    Then the user completes the "Sign Up" process manually
