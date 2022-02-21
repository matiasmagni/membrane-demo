/// <reference types="Cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import BasePage from "../pages/BasePage";
import HomePage from '../pages/HomePage';
import SignInPage from "../pages/SignInPage";


Given('the user has navigated to Membrane Demo home page', () => {
  const page = new HomePage();
  page.navigateToThisPage(60);
});

Then('the user is redirected to a secured URL', () => {
  cy.url().should('match', /^https?:\/\//);
});

Then('the user is redirected to the {string} page', (pageName) => {
  let pageURI: string;

  switch (pageName) {
    case 'Sign In':
      pageURI = '/sign-in';
      break;

    default:
      throw new Error(`"${pageName}" page redirecting verification was not implemented yet!`);
  }

  const regex = new RegExp(`${pageURI}$`);
  cy.url().should('match', regex);
});

Then('the user visualizes {string} page elements correctly', (pageName, table: any) => {
  const data = table.rows();
  let page: BasePage;

  switch (pageName) {
    case "Sign In":
      page = new SignInPage();

      data.forEach(([elementName, elementType, elementContent]: string[], index: Number) => {
        let element: Cypress.Chainable;

        switch (elementType) {
          case 'image':
            element = page.getElement(elementName);
            element.should('exist')
              .and('be.visible')
              .and('to.have.attr', 'alt', elementContent);

          break;

          case 'text':
            element = page.getElement(elementName);
            element.should('exist')
              .and('be.visible')
              .and('to.contain.text', elementContent);

            break;

          case 'text input':
          case 'password input':
            page.findText(elementName).should('be.visible');
            element = page.getElement(elementName);
            element.should('exist')
              .and('be.visible')
              .and('to.have.attr', 'type', elementType.replace(' input', ''))
              .and('have.attr', 'placeholder', elementContent);

            break;

          case 'SVG image':
            element = page.getElement(elementName);
            element.should('exist')
              .and('be.visible')
              .and('to.have.attr', 'data-icon', elementContent);
              
            break;

          case 'button':
            element = page.getElement(elementName);
            element.should('exist')
              .and('be.visible')
              .and('to.contain.text', elementContent)
              .and('to.be.disabled');

            break;

          case 'text link':
            const links = page.getElement('linkButtons');

            switch (elementName) {
              case 'Sign Up Link':
                element = links.first();
                break;

              case 'Forgot Password Link':
                element = links.last();
                break;

              default:
                throw new Error(`${elementType} verification not implemented yet!`);
            }

            element.should('exist')
              .and('be.visible')
              .and('to.contain.text', elementContent);

            break;

          default:
            throw new Error(`${elementType} verification not implemented yet!`);
        }
      });

      break;

    default:
      throw new Error(`${pageName} page verification not implemented yet!`);
  }
});
