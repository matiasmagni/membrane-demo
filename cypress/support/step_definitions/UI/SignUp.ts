/// <reference types="Cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import NotFoundError from 'cypress/support/errors/NotFoundError';
import SignUpPage from 'cypress/support/pages/SignUpPage';
import { extractVerificationCode } from 'cypress/utils/validation';
import App from '../../App';

Then('the user visualizes {string} error message below the Phone Number field on Sign Up page',
    (errorMessage: string) => App.verifyErrorMessage(errorMessage, 'number', 'Sign Up')
);

Then('the user receives the 6-digit secury code on his email address', () => {
    cy.get('@userEmail').then((userEmail: any) => {
        cy.task("gmail:check", {
            from: "no-reply@domain.com",
            to: userEmail,
            subject: "Confirm your account"
        }).then((emails: any) => {
            expect(emails).to.be.not.empty;
            cy.wrap(extractVerificationCode(emails[0].body.html)).as('verificationCode');
        });
    });
});

When('the user inputs the secury code', () => {
    const page = new SignUpPage();
    let element: Cypress.Chainable | null;

    cy.get('@verificationCode').then((verificationCode: any) => {
        element = page.getElement('verificationCodeInput');

        if (element) {
            element.type(verificationCode);
        } else {
            throw new NotFoundError('verificationCodeInput');
        }
    });
});
