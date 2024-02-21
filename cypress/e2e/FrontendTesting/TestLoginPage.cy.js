import HomePage from "../../PageObjects/HomePage"
import TestLoginPage from "../../PageObjects/LoginPage";

describe("Test Login Page functionality", () => {

    let login_page = new TestLoginPage();
    let home_page = new HomePage();
    beforeEach(() => {
        let url = 'https://practicetestautomation.com/practice/'
        let ExpTitle = 'Practice | Practice Test Automation'
        let LoginPageLinkText = 'Test Login Page'
        let ExceptionsPageLinkText = 'Test Exceptions'
        let loginPageTitle = 'Test Login | Practice Test Automation'

        home_page.openHomePage(url)
        home_page.verifyHomePageTitle(ExpTitle)
        home_page.verifyLinksInPage(LoginPageLinkText, ExceptionsPageLinkText)
        login_page.openLoginPage(loginPageTitle)

    })


    it("Login with valid credentials and verify", () => {

        cy.fixture('ValidLoginCredentials').then((data) => {

            let creds = data
            login_page.setUserName(creds.username)
            login_page.setPassword(creds.password)
            login_page.clickSubmit()
            login_page.verifyPostSuccessfulLogin(creds.SuccessMessage);
            login_page.clickLogout()
        })
    })

    // Validating 5 different wrong combinations 
    it("Trying Login with invalid credentials and verify", () => {

        cy.fixture('InvalidLoginCredentials').then((data) => {

            data.forEach(invalidData => {
                login_page.setUserName(invalidData.username)
                login_page.setPassword(invalidData.password)
                login_page.clickSubmit()
                login_page.incorrectCredentialsValidation(invalidData.ErrorMessage)
            });
        })
    })
})