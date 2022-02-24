/// <reference types="Cypress" />
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { capitalize, camelize } from "../../utils/string";
import { getRandomElementFrom } from "../../utils/random";
import BasePage from "../pages/BasePage";
import PageFactory from "../pages/PageFactory";
import SignUpPage from "../pages/SignUpPage";

const unfocus = (fieldName: string, pageName: string) => {
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);
    page.getElement(fieldName).focus().blur();
};

const verifyErrorMessage = (errorMessage: string, fieldName: string, pageName: string) => {
    PageFactory.getCurrentPageObject(pageName)
        .getElementBySearchParam('errorMessage', camelize(fieldName))
        .should('exist')
        .and('to.be.visible')
        .and('to.have.text', errorMessage)
        .should('have.css', 'color')
        .and('eq', 'rgb(235, 87, 87)');
};

Given('the user has navigated to Membrane Demo {string} page', (pageName) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
});

Then('the user is redirected to the {string} page', (pageName) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});

Then('the user is redirected to a secured URL', () => {
    cy.url().should('match', /^https?:\/\//);
});

Then('the user visualizes {string} page elements correctly', (pageName, table: any) => {
    const data = table.rows();
    let page: BasePage = PageFactory.getCurrentPageObject(pageName);

    switch (pageName) {
        case "Sign In":
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
                            .and('to.contain.text', elementContent);

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

Then('the user completes the {string} process manually', (processName: string) => {
    cy.pause();
});

Then('the user visualizes {string} button is inactive', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).should('be.disabled');
});

Then('the user visualizes {string} button is active', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).should('not.be.disabled');
});

When('the user unfocus the {string} field on {string} page', unfocus);

When(/the user unfocus the Phone Number (dropdown|input) field on Sign Up page/,
    (fieldType: string) => {
        new SignUpPage().getElement('phone' + capitalize(fieldType)).focus().blur();
    }
);

Then('the user visualizes {string} error message below the {string} field on {string} page', verifyErrorMessage);

Then('the user visualizes {string} error message below the Phone Number field on Sign Up page',
    (errorMessage: string) => verifyErrorMessage(errorMessage, 'number', 'Sign Up')
);

When('the user inputs invalid format data on the {string} field on {string} page',
    (fieldName: string, pageName: string) => {
        let page: BasePage = PageFactory.getCurrentPageObject(pageName);
        page.getElement(fieldName).clear().type(getRandomElementFrom(page.getTestData('invalidEmails')));
    }
);

When('the user fills all fields with wrong data on {string} page', (pageName: string) => {
    let page: BasePage = PageFactory.getCurrentPageObject(pageName);
    page.getElement('Email').clear().type(getRandomElementFrom(page.getTestData('wrongEmails')));

    page.getElement('Password').clear().type(
        getRandomElementFrom(page.getTestData('wrongPasswords'))
    );
});

When('the user clicks on {string} button', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).click();
});

Then('the user visualizes {string} on {string} popup message',
    (errorMessage: string, pageName: string) => {
        PageFactory.getCurrentPageObject(pageName).getElement('errorMessageIcon')
            .should('exist')
            .and('to.be.visible');

        PageFactory.getCurrentPageObject(pageName).getElement('popupErrorMessage')
            .should('exist')
            .and('to.be.visible')
            .and('to.have.text', errorMessage);
    }
);
