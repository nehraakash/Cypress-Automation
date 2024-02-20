import HomePage from "../../PageObjects/HomePage"
import SeleniumExceptions from "../../PageObjects/SeleniumExceptionsPage";

describe("Test Selenium Exceptions", () => {

    let home_page = new HomePage();
    let exceptions_Page = new SeleniumExceptions()

    beforeEach(() => {
        let url = 'https://practicetestautomation.com/practice/'
        let ExceptionsPageTitle = 'Test Exceptions | Practice Test Automation'

        home_page.openHomePage(url)
        exceptions_Page.openExceptionsPage(ExceptionsPageTitle)

        cy.on("uncaught:exception", (e, runnable) => {
            console.log("error", e);
            console.log("runnable", runnable.title);
            console.log("error", e.message);
            return false;
        });
    })

    it("Verify NoSuchElementException ", () => {

        exceptions_Page.VerifyNoSuchElementException()
    })

    it.only("Verify ElementNotInteractableException ", () => {

        exceptions_Page.VerifyElementNotInteractableException()
    })

    it("Verify InvalidElementStateException ", () => {

        exceptions_Page.VerifyInvalidElementStateException()
    })

    it("Verify StaleElementReferenceException ", () => {

        exceptions_Page.VerifyStaleElementReferenceException()
    })

    it("Verify TimeoutException ", () => {

        exceptions_Page.VerifyTimeoutException()
    })

})
