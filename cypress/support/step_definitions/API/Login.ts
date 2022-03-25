/// <reference types="Cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { getEndpointUrl } from '../../../utils/endpoints';
import { getRandomElementFrom } from '../../../utils/random';

Given('the user has make a request with valid data to {string} endpoint', (endpoint: string) => {
    cy.fixture('data/SignInPage').then((data: any) => {
        cy.request('POST', getEndpointUrl(endpoint), {
            email: getRandomElementFrom(data.wrongEmails),
            password: getRandomElementFrom(data.wrongPasswords),
        }).as('apiData');
    });
});

Then('the user gets a 200 response code', () => {
    cy.get('@apiData').then((response: any) => {
        expect(response.status).to.eql(200); // Status Code 200
    });
});

Then('the user gets a 401 error message {string} from {string} endpoint',
    (errorMessage: string, endpoint: string) => {
        cy.get('@apiData').then((response: any) => {
            switch (endpoint) {
                case 'Login':
                    const properties = [
                        'error',
                        'statusCode',
                    ];

                    expect(response).to.have.property('headers');
                    expect(response).to.have.property('duration');
                    expect(response).to.have.property('body');
                    expect(response.body).to.be.not.empty;

                    properties.forEach(property => {
                        expect(response.body).to.have.property(property);
                    });

                    expect(response.body.error.code).to.eql(401);
                    expect(response.body.error.message).to.eql(errorMessage);
                    expect(response.body.error.source).to.eql('LATTICE_API');
                    expect(response.body.statusCode).to.eql(401);

                    break;

                default:
                    throw new Error(`Step implementation missing for "${endpoint}" endpoint!`);
            }
        });
    }
);
