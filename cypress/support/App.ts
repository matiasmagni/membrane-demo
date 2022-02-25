import { camelize } from "../utils/string";
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
        PageFactory.getCurrentPageObject(pageName)
            .getElementBySearchParam('errorMessage', camelize(fieldName))
            .should('exist')
            .and('to.be.visible')
            .and('to.have.text', errorMessage)
            .should('have.css', 'color')
            .and('eq', 'rgb(235, 87, 87)');
    }
}
