/// <reference types="Cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { capitalize } from '../../utils/string';
import App from '../App';
import SignUpPage from '../pages/SignUpPage';

When('the user unfocus the Phone Number input field on Sign Up page',
    (fieldType: string) => {
        new SignUpPage().getElement('phone' + capitalize(fieldType)).focus().blur();
    }
);

Then('the user visualizes {string} error message below the Phone Number field on Sign Up page',
    (errorMessage: string) => App.verifyErrorMessage(errorMessage, 'number', 'Sign Up')
);
