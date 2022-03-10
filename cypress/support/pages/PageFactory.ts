import BasePage from "./BasePage";
import HomePage from "./HomePage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import SignUpPasswordPage from "./SignUpPasswordPage";

export default class PageFactory {
    /**
     * Gets the page's object for the given name.
     * 
     * @param pageName The page's name.
     * @returns A page object.
     */
     public static getCurrentPageObject(pageName: string): BasePage {
        let page: BasePage;
    
        switch (pageName) {
            case 'Home':
                page = new HomePage();
                break;
    
            case 'Sign In':
                page = new SignInPage();
                break;
    
            case 'Sign Up':
                page = new SignUpPage();
                break;

            case 'Sign Up Password':
                page = new SignUpPasswordPage();
                break;
    
            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }
    
        return page;
    };
}
