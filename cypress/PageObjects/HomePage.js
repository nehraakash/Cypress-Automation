class HomePage{

    testLoginPageLink = "a[href='https://practicetestautomation.com/practice-test-login/']"
    testExceptionsPageLink = "a[href='https://practicetestautomation.com/practice-test-exceptions/']"
    beforeHoverLinksColor = 'rgb(102, 102, 102)'
    afterHoverLinksColor = 'rgb(255, 194, 112)'
    openHomePage(url){
        cy.visit(url);
    }

    verifyHomePageTitle(ExpectedTitle){
        cy.title().should('eq', ExpectedTitle)
    }

    verifyLinksInPage(LoginPageLinkText, ExceptionsPageLinkText){

        // checking visibility and before hover color
        cy.get(this.testLoginPageLink).should('be.visible').contains(LoginPageLinkText)
            .and('have.css', 'color', this.beforeHoverLinksColor)

        cy.get(this.testExceptionsPageLink).should('be.visible').contains(ExceptionsPageLinkText)
            .and('have.css', 'color', this.beforeHoverLinksColor)

        // checking after hover color
        cy.get(this.testLoginPageLink).realHover().wait(2000).should('have.css', 'color', this.afterHoverLinksColor)
        cy.get(this.testExceptionsPageLink).realHover().wait(2000).should('have.css', 'color', this.afterHoverLinksColor)
        }
}

export default HomePage;