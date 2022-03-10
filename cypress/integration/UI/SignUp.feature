Feature: Sign Up
  As a User, I want to be able to sign up on Membrane demo.


  Scenario: User visualizes Sign Up page correctly
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Sign Up" page elements correctly
      | element      | type         | content                    |
      | First Name   | text input   | Enter your first name here |
      | Last Name    | text input   | Enter your last name here  |
      | Email        | text input   | Enter your email here      |
      | Country      | dropdown     | Country code               |
      | Phone Number | number input | Enter your mobile number   |
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
    When the user unfocus the "Phone Number" field on "Sign Up" page
    Then the user visualizes "This field is required" error message below the Phone Number field on Sign Up page
    When the user inputs invalid format data on the "Email" field on "Sign Up" page
    Then the user visualizes "Invalid email format" error message below the "Email" field on "Sign Up" page

  @PipelineIgnore
  Scenario: User completes sign up process after inputting valid data (Hybrid)
    Given the user has navigated to Membrane Demo "Sign Up" page
    Then the user visualizes "Next" button is inactive
    When the user fills all fields with valid data on "Sign Up" page
      | fieldName           | value                 |
      | First Name          | Soledad               |
      | Last Name           | Basle                 |
      | Email (Random Base) | solanabasle@gmail.com |
      | Country             | Argentina             |
      | Phone Number        | 2634849515            |
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes "Please enter below the 6-digit security code. You will get it through EMAIL to your {address} email account." on "Sign Up" page
    When the user receives the 6-digit security code, inputs it and click on Next button manually
    Then the user visualizes "Sign Up Password" page elements correctly
      | element                    | type           | content                                           |
      | Title                      | text           | Sign Up                                           |
      | Subtitle                   | text           | Please, set up your password                      |
      | Form Legend                | text           | *Required fields                                  |
      | Password                   | password input | Be sure you use a strong password                 |
      | Password Eye Icon          | SVG image      | eye                                               |
      | Password Description       | text           | Your password must contain                        |
      | Password Description Point | text           | At least 10 characters                            |
      | Password Description Point | text           | Upper and lowercase letters (a-z)                 |
      | Password Description Point | text           | At least 1 non-alphanumeric symbol (e.g. @-#/!_*) |
      | Password Description Point | text           | At least 1 number (0-9)                           |
      | Repeat Password            | password input | Repeat your password                              |
      | Repeat Password Eye Icon   | SVG image      | eye                                               |
      | Cancel Button              | button         | Cancel                                            |
      | Next Button                | button         | Next                                              |
    When the user fills all fields with valid data on "Sign Up Password" page
      | fieldName       | value        |
      | Password        | T3stP@ssw0rd |
      | Repeat Password | T3stP@ssw0rd |
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes the popup window elements correctly on "Sign Up" page
      | element    | type      | content                                                                                |
      | Check Icon | SVG image | check-circle                                                                           |
      | Message    | text      | You have successfully signed up on Membrane! Proceed to login to start the onboarding. |
     #| Close Icon | SVG image | times                                                                                  |
