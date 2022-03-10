/// <reference types="Cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { WAIT_TIME_PAGE_LOAD, WAIT_TIME_UNFOCUS } from '../../../../config.json';
import { getRandomElementFrom, getRandomEmail } from '../../../utils/random';
import App from '../../App';
import NotFoundError from '../../errors/NotFoundError';
import BasePage from '../../pages/BasePage';
import PageFactory from '../../pages/PageFactory';

Given('the user has navigated to Membrane Demo {string} page', (pageName: string) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
    cy.wait(WAIT_TIME_PAGE_LOAD);
});

Then('the user is redirected to the {string} page', (pageName: string) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});

Then('the user is redirected to a secured URL', () => {
    cy.url().should('match', /^https?:\/\//);
});

Then('the user visualizes {string} page elements correctly', App.verifyCorrectVisualization);

Then('the user visualizes the popup window elements correctly on {string} page',
    App.verifyCorrectVisualization
);


When('the user receives the 6-digit security code, inputs it and click on Next button manually',
    cy.pause
);

Then('the user visualizes {string} button is inactive', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).should('be.disabled');
});

Then('the user visualizes {string} button is active', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).should('not.be.disabled');
});

When('the user unfocus the {string} field on {string} page',
    (fieldName: string, pageName: string) => {
        const page: BasePage = PageFactory.getCurrentPageObject(pageName);
        const field: Cypress.Chainable | null = page.getElement(fieldName);

        if (field) {
            field.focus().blur();
            cy.wait(WAIT_TIME_UNFOCUS); // Wait for the element to verify to appear.
        } else {
            throw new NotFoundError(fieldName);
        }
    }
);

Then('the user visualizes {string} error message below the {string} field on {string} page',
    App.verifyErrorMessage
);

When('the user inputs invalid format data on the {string} field on {string} page',
    (fieldName: string, pageName: string) => {
        let page: BasePage = PageFactory.getCurrentPageObject(pageName);
        const invalidEmail = getRandomElementFrom(page.getTestData('invalidEmails'));
        const field: Cypress.Chainable | null = page.getElement(fieldName);

        if (field) {
            field.clear().type(invalidEmail);
        } else {
            throw new NotFoundError(fieldName);
        }
    }
);

When('the user fills all fields with wrong data on {string} page', (pageName: string) => {
    let page: BasePage = PageFactory.getCurrentPageObject(pageName);
    const email: Cypress.Chainable | null = page.getElement('Email');

    if (email) {
        email.clear().type(getRandomElementFrom(page.getTestData('wrongEmails')));
    } else {
        throw new NotFoundError('Email field');
    }

    const password: Cypress.Chainable | null = page.getElement('Password');

    if (password) {
        password.clear().type(getRandomElementFrom(page.getTestData('wrongPasswords')));
    } else {
        throw new NotFoundError('Password field');
    }
});

When('the user clicks on {string} button', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).click();
});

Then('the user visualizes {string} on {string} popup message',
    (errorMessage: string, pageName: string) => {
        const page: BasePage = PageFactory.getCurrentPageObject(pageName);
        /*
        const errorMessageIcon: Cypress.Chainable | null = page.getElement('errorMessageIcon');

        if (errorMessageIcon) {
            errorMessageIcon.should('exist')
                .and('to.be.visible');
        } else {
            throw new NotFoundError('Error message icon');
        }
        */
        cy.contains(errorMessage).should('exist')
            .and('to.be.visible');
    }
);

When('the user fills all fields with valid data on {string} page',
    (pageName: string, table: any) => {
        const data: any = table.rows();
        const page: BasePage = PageFactory.getCurrentPageObject(pageName);
        let element: Cypress.Chainable | null = null;

        data.forEach(([fieldName, fieldValue]: string[]) => {
            switch (fieldName) {
                case 'Country':
                    element = page.getElement(fieldName);

                    if (element) {
                        element.click({ force: true });
                        cy.contains('li', fieldValue).click({ force: true });
                    } else {
                        throw new NotFoundError(fieldName + ' field');
                    }

                    break;

                case 'Email (Random Base)':
                    fieldName = 'Email';
                    const [emailPrefix, emailDomain] = fieldValue.split('@');
                    fieldValue = getRandomEmail(emailPrefix, emailDomain);

                default:
                    element = page.getElement(fieldName);

                    if (element) {
                        element.clear().type(fieldValue);
                    } else {
                        throw new NotFoundError(fieldName + ' field');
                    }
            }
        });
    }
);

Then('the user visualizes {string} on {string} page', (message: string, pageName: string) => {
    message.split('{address}').forEach((msg: string) => {
        cy.contains(msg)
            .should('exist')
            .and('to.be.visible');
    });
});

Then('the user visualizes a popup message: {string}', (message: string) => {
    cy.contains(message)
        .should('exist')
        .and('to.be.visible');
});
