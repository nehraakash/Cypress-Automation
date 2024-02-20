class TestLoginPage{

    testLoginPageLink = "a[href='https://practicetestautomation.com/practice-test-login/']"
    SuccessMsgFontColor = 'rgb(18, 18, 18)'
    logoutBtnBackgroundColor = 'rgb(49, 49, 49)'
    logouBtnFontColor = 'rgb(255, 255, 255)'
    errorMsgBackgroundColor = 'rgb(227, 72, 72)'
    logoutBtnFontSize = '20.25px'
    SuccessMsgFontSize = '51.008px'
    ErrorMsgFontSize = '16px'
    usernameSelector = '#username'
    passwordSelector = '#password'
    submitBtnSelector = '#submit'
    SuccessMsgSelector = '.post-title'
    logoutBtnSelector = '.wp-block-button__link'


    openLoginPage(expectedLoginPageTitle){
        cy.get(this.testLoginPageLink).click().title()
        .should('be.eq', expectedLoginPageTitle)
    }

    setUserName(username){
        if(username != "")
        cy.get(this.usernameSelector).type(username)
    }
    setPassword(password){
        if(password != "")
        cy.get(this.passwordSelector).type(password)
    }
    clickSubmit(){
        cy.get(this.submitBtnSelector).click()
    }
    verifyPostSuccessfulLogin(successMsg){

        cy.get(this.SuccessMsgSelector).should('be.visible').contains(successMsg)
        .and('have.css', 'color', this.SuccessMsgFontColor)
        .and('have.css', 'font-size', this.SuccessMsgFontSize)

        cy.get(this.logoutBtnSelector).should('be.visible')
        .and('have.text', 'Log out')
        .and('have.css', 'background-color' , this.logoutBtnBackgroundColor)
        .and('have.css', 'color' , this.logouBtnFontColor)
        .and('have.css', 'font-size', this.logoutBtnFontSize)
    }
    clickLogout(){
        cy.get('.wp-block-button__link').click();
    }

    incorrectCredentialsValidation(ExpectedErrorMsg){

        cy.get('#error').should('be.visible').and('have.text', ExpectedErrorMsg)
        .and('have.css', 'color', this.logouBtnFontColor) // both logout and error msg color is white, Hence using same attribute.
        .and('have.css', 'background-color', this.errorMsgBackgroundColor)
        .and('have.css', 'font-size', this.ErrorMsgFontSize)
    }
}

export default TestLoginPage;