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
    When the user unfocus the "First Name" field on "Sign Up" page
    Then the user visualizes "This field is required" error message below the "First Name" field on "Sign Up" page
    When the user unfocus the "Last Name" field on "Sign Up" page
    Then the user visualizes "This field is required" error message below the "Last Name" field on "Sign Up" page
    When the user unfocus the "Email" field on "Sign Up" page
    Then the user visualizes "This field is required" error message below the "Email" field on "Sign Up" page
    When the user unfocus the Phone Number input field on Sign Up page
    Then the user visualizes "This field is required" error message below the Phone Number field on Sign Up page
    When the user inputs invalid format data on the "Email" field on "Sign Up" page
    Then the user visualizes "Invalid email format" error message below the "Email" field on "Sign Up" page

  Scenario: User completes sign up process after inputting valid data (Hybrid)
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Next" button is inactive
    When the user fills all fields with valid data on "Sign Up" page
      | fieldName             | value                          |
      | First Name            | Soledad                        |
      | Last Name             | Basle                          |
      | Email                 | solanabasle+new-test@gmail.com |
      | Phone Number Dropdown | Argentina                      |
      | Phone Number Input    | 2634849515                     |
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes "Please enter below the 6-digit security code. You will get it through EMAIL to your {address} email account." on "Sign Up" page
    When the user receives the 6-digit security code, inputs it and click on Next button manually
    Then the user visualizes "Sign Up Password" form elements correctly
      | element                    | type       | content                                           |
      | Password                   | input text | Be sure you use a strong password                 |
      | Password Description       | text       | Your password must contain                        |
      | Password Description Point | text       | At least 10 characters                            |
      | Password Description Point | text       | Upper and lowercase letters (a-z)                 |
      | Password Description Point | text       | At least 1 non-alphanumeric symbol (e.g. @-#/!_*) |
      | Password Description Point | text       | At least 1 number (0-9)                           |
