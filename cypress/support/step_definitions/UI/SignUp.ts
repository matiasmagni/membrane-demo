/// <reference types="Cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';
import App from '../../App';

Then('the user visualizes {string} error message below the Phone Number field on Sign Up page',
    (errorMessage: string) => App.verifyErrorMessage(errorMessage, 'number', 'Sign Up')
);
