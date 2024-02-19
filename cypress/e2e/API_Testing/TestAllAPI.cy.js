describe("Get list of Users", () => {

    it("Get call to fetch list of users", () => {

        let page = 2
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: { page: page }
        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.page).to.equal(page)
                let per_page = response.body.per_page
                expect(response.body.data).have.length(per_page)
                cy.log(response.body)
            })
    })



    it("Get call to fetch single user", () => {

        let id = 2
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/' + id,
        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.data.id).to.equal(id)
                cy.log(response.body)
            })
    })

    it("Get call for user not found", () => {

        let id = 23
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/' + id,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(404)
                expect(response.body).is.empty
                cy.log(response.body)
            })
    })

    it("Get call to fetch list of resources", () => {

        let page = 1
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown',
            qs: { page: page }
        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.page).to.equal(page)
                let per_page = response.body.per_page
                expect(response.body.data).have.length(per_page)
                cy.log(response.body)
            })
    })

    it("Get call to fetch single resource", () => {

        let expectedId = 2
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/' + expectedId,
        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.data.id).to.equal(expectedId)
                cy.log(response.body)
            })
    })

    it("Get call for resource not found", () => {

        let Id = 23
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/' + Id,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(404)
                expect(response.body).is.empty
                cy.log(response.body)
            })
    })

    it("Post call for creating a user", () => {

        cy.fixture('newUser').then((data) => {
            let reqBody = data;
            cy.request({
                method: 'POST',
                url: 'https://reqres.in/api/users',
                body: reqBody
            })
                .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.name).to.equal(reqBody.name)
                    expect(response.body.job).to.equal(reqBody.job)
                    cy.log(response.body)
                })
        })
    })

    it("Put call for updating a user", () => {

        let id = 2;
        cy.fixture('updateUser').then((data) => {
            let reqBody = data;
            cy.request({
                method: 'PUT',
                url: 'https://reqres.in/api/users/'+id,
                body: reqBody
            })
                .then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.name).to.equal(reqBody.name)
                    expect(response.body.job).to.equal(reqBody.job)
                    cy.log(response.body)
                })
        })
    })

    it("Patch call for updating a user", () => {

        let id = 2;
        cy.fixture('patchUser').then((data) => {
            let reqBody = data;
            cy.request({
                method: 'PATCH',
                url: 'https://reqres.in/api/users/'+id,
                body: reqBody
            })
                .then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.name).to.equal(reqBody.name)
                    expect(response.body.job).to.equal(reqBody.job)
                    cy.log(response.body)
                })
        })
    })

    it("Delete call for deleting a user", () => {

        let Id = 2
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/' + Id,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(204)
                expect(response.body).is.empty
                cy.log(response.body)
            })
    })

    it("Post call for successfully registering a user", () => {

        cy.fixture('registerUser').then((data) => {
            let reqBody = data;
            cy.request({
                method: 'POST',
                url: 'https://reqres.in/api/register',
                body: reqBody
            })
                .then((response) => {
                    expect(response.status).to.equal(200)
                    cy.log(response.body)
                })
        })
    })

    // MULTIPLE FAILURE CONDITIONS MENTIONED IN FIXTURE FILE
    it("Post call for unsuccessful registration of a user", () => {

        cy.fixture('unsuccessfulRegister').then((data) => {

            data.forEach(reqBody => {
                cy.request({
                    method: 'POST',
                    url: 'https://reqres.in/api/register',
                    body: reqBody,
                    failOnStatusCode: false
                })
                    .then((response) => {
                        expect(response.status).to.equal(400)
                        cy.log(response.body)
                        expect(response.body.error).to.equal(reqBody.error)
                    })
            });
        })
    })

    it("Post call for successfully login", () => {

        cy.fixture('successfulLogin').then((data) => {
            let reqBody = data;
            cy.request({
                method: 'POST',
                url: 'https://reqres.in/api/login',
                body: reqBody
            })
                .then((response) => {
                    expect(response.status).to.equal(200)
                    cy.log(response.body)
                    expect(response.body).is.not.empty
                })
        })
    })

    // MULTIPLE FAILURE CONDITIONS MENTIONED IN FIXTURE FILE
    it("Post call for unsuccessful login", () => {

        cy.fixture('unsuccessfulRegister').then((data) => {

            data.forEach(reqBody => {
                cy.request({
                    method: 'POST',
                    url: 'https://reqres.in/api/login',
                    body: reqBody,
                    failOnStatusCode: false
                })
                    .then((response) => {
                        expect(response.status).to.equal(400)
                        cy.log(response.body)
                        expect(response.body.error).to.equal(reqBody.error)
                    })
            });
        })
    })

    it("Get call for delayed response", () => {

        let delayTime = 5
        let page = 2
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users',
            qs: { delay: delayTime, page: page }
        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.page).to.equal(page)
                let per_page = response.body.per_page
                expect(response.body.data).have.length(per_page)
                cy.log(response.body)
            })
    })
}) 