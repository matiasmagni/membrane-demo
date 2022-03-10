import { camelize } from "../utils/string";
import NotFoundError from "./errors/NotFoundError";
import BasePage from "./pages/BasePage";
import PageFactory from "./pages/PageFactory";

export default class App {
    /**
     * Verifies common error messages on the app.
     * 
     * @param errorMessage A string containing the error message.
     * @param fieldName The name of the field where the error messaged will be displayed below.
     * @param pageName The name of the page where the error is displayed.
     */
    public static verifyErrorMessage(errorMessage: string, fieldName: string, pageName: string) {
        const element: Cypress.Chainable | null = PageFactory.getCurrentPageObject(pageName)
            .getElementBySearchParam('errorMessage', camelize(fieldName));

        if (element) {
            element.should('exist')
                .and('to.be.visible')
                .and('to.have.text', errorMessage)
                .should('have.css', 'color')
                .and('eq', 'rgb(235, 87, 87)');
        } else {
            throw new NotFoundError(`"${errorMessage}" message`);
        }
    }

    /**
     * Verifies the correct visualization of the elements passed by a data table.
     * 
     * @param pageName The name of the page, window or popup window where the elements will be verified.
     * @param table The Cucumber DataTable object.
     */
    public static verifyCorrectVisualization(pageName: string, table: any) {
        const data = table.rows();
        let page: BasePage = PageFactory.getCurrentPageObject(pageName);

        data.forEach(([elementName, elementType, elementContent]: string[], index: Number) => {
            let element: Cypress.Chainable | null = null;

            switch (elementType) {
                case 'image':
                    element = page.getElement(elementName);

                    if (element) {
                        element.should('exist')
                            .and('be.visible')
                            .and('to.have.attr', 'alt', elementContent);
                    } else {
                        throw new NotFoundError(elementName);
                    }

                    break;

                case 'button':
                    element = cy.contains('button', elementContent);
                    element.should('exist')
                        .and('be.visible');

                    break;

                case 'dropdown':
                    App.verifyInput(page, 'country', 'text', elementContent);
                    break;

                case 'text input':
                case 'number input':
                case 'email input':
                case 'password input':
                    page.findText(elementName).should('be.visible');
                    App.verifyInput(page, elementName, elementType, elementContent);
                    break;

                case 'SVG image':
                    element = page.getElement(elementName);

                    if (element) {
                        element.should('exist')
                            .and('be.visible')
                            .and('to.have.attr', 'data-icon', elementContent);
                    } else {
                        throw new NotFoundError(elementName);
                    }

                    break;

                case 'text link':
                    switch (pageName) {
                        case 'Sign In':
                            const links: Cypress.Chainable | null = page.getElement('linkButtons');

                            if (links) {
                                switch (elementName) {
                                    case 'Sign Up Link':
                                        element = links.first();
                                        break;

                                    case 'Forgot Password Link':
                                        element = links.last();
                                        break;

                                    default:
                                        element = cy.contains('button', elementContent);
                                }
                            } else {
                                throw new NotFoundError(elementName);
                            }

                            break;

                        case 'Sign Up':
                            element = cy.contains('button', elementContent);
                            break;

                        default:
                            element = page.getElement(elementName);
                    }

                    if (element) {
                        element.should('exist')
                            .and('be.visible')
                            .and('to.contain.text', elementContent);
                    } else {
                        throw new NotFoundError(elementName);
                    }

                    break;

                default:
                    cy.log('ELEMENT:', elementName, elementType, elementContent);
                    cy.log('ELEMENT:', page.getElement(elementName));
                    element = page.getElement(elementName) || cy.contains(elementContent);

                    element.should('exist')
                        .and('be.visible')
                        .and('to.contain.text', elementContent);
            }
        });
    }

    /**
     * Verifies an input element.
     * 
     * @param page The Page's object.
     * @param elementName The name of the element to find.
     * @param elementType The type of the element.
     * @param elementContent The content of the element.
     */
    public static verifyInput(page: BasePage, elementName: string, elementType: string, elementContent: string) {
        let element: Cypress.Chainable | null = page.getElement(elementName);

        if (element) {
            element.should('exist')
                .and('be.visible')
                .and('to.have.attr', 'type', elementType.replace(' input', ''))
                .and('have.attr', 'placeholder', elementContent);
        } else {
            throw new NotFoundError(elementName);
        }
    }
}
