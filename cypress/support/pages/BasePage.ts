import { camelize } from "../../utils/string";

/**
 * BasePage class. All page objects must inherite from this class.
 */
export default abstract class BasePage {

    protected url: string = "";
    protected selectors: any = null;
    protected data: any = null;

    constructor() {
        try {
            this.selectors = require(`../../fixtures/selectors/${this.constructor.name}.json`);
            this.data = require(`../../fixtures/data/${this.constructor.name}.json`);
            this.url = this.selectors.URL;
        } catch (error) {
            cy.log('Page Object', error);
        }
    }

    /**
     * Finds a button element by the given name (inner text).
     * 
     * @param name The button's name.
     * @returns A button element.
     */
    public static getButtonByName(name: string): Cypress.Chainable {
        return cy.contains('button', name);
    }

    public getUrl(): string {
        return this.url;
    }

    /**
     * Navigates to this page object's URL.
     * 
     * @param timeout in seconds.
     */
    public navigateToThisPage(timeout: number = 10) {
        cy.visit(this.getUrl(), { timeout: timeout * 1000 });
    }

    /**
     * Gets a page element identified by the given name.
     * 
     * @param name the name of the page's element. 
     * @returns The page's element.
     */
    public getElement(name: string): Cypress.Chainable {
        return cy.get(this.selectors[camelize(name)]);
    }

    /**
     * Searches a page element by a param key and identified by the given name.
     * 
     * @param name the name of the page's element.
     * @param searchParam the param that describes the search key for the element. 
     * @returns The page's element.
     */
    public getElementBySearchParam(name: string, searchParam: string): Cypress.Chainable {
        return cy.get(this.selectors[camelize(name)].replace('{name}', searchParam));
    }

    /**
     * Gets the testing data identified by the field name.
     * 
     * @param fieldName The field's name where the data will be inputted.
     * @returns The requested testing data.
     */
    public getTestData(fieldName: string): number | string | any {
        return this.data[fieldName];
    }

    public findText(text: string): Cypress.Chainable {
        return cy.contains(text);
    }

    protected scrollSlowlyToBottom() {
        cy.scrollTo('bottom', { duration: Cypress.env('timeouts').scroll });
    }

    protected scrollSlowlyToTop() {
        cy.scrollTo('top', { duration: Cypress.env('timeouts').scroll });
    }
}
