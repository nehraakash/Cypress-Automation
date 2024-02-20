class SeleniumExceptions{

    testExceptionsPageLink = "a[href='https://practicetestautomation.com/practice-test-exceptions/']"
    addBtnSelector = '#add_btn'
    Row1Selector = "input[type='text']"
    Row2Selector = "div[id='row2'] input[type='text']"
    EditBtnSelector = '#edit_btn'
    SaveBtnSelector = '#save_btn'
    instructionsSelector = '#instructions'

    openExceptionsPage(expectedPageTitle){
        cy.get(this.testExceptionsPageLink).click().title()
        .should('be.eq', expectedPageTitle)
    }

    VerifyNoSuchElementException(){
        cy.get(this.addBtnSelector).click();
        cy.get(this.Row2Selector)
            .should('not.exist')
    }

    VerifyElementNotInteractableException(){

        cy.get(this.addBtnSelector).click()
        cy.wait(5000)
        cy.get(this.Row2Selector).should('be.visible').type('Welcome')
        cy.get("[name = 'Save']").invoke('show').click({ multiple: true }, {force: true})
    }

    VerifyInvalidElementStateException(){
        cy.get(this.Row1Selector).should('be.disabled')
        cy.get(this.EditBtnSelector).should('be.visible').click();
        cy.get(this.Row1Selector).should('be.enabled').clear().type('Burger')
        cy.get(this.SaveBtnSelector).click()

    }

    VerifyStaleElementReferenceException(){
        cy.get(this.instructionsSelector).should('be.visible')
        cy.get(this.addBtnSelector).click()
        cy.get(this.instructionsSelector).should('not.exist')
    }

    VerifyTimeoutException(){
        cy.get(this.addBtnSelector).click().wait(3000)
        cy.get(this.Row2Selector)
            .should('not.exist')
    }
}

export default SeleniumExceptions