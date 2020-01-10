describe('Blog ', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Elaine',
            username: 'elaine',
            password: 'test'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened (without login)', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to Blog App')
    })

    it('user can login', function () {
        cy.contains('Login')
            .click()
        cy.get('#username')
            .type('elaine')
        cy.get('#password')
            .type('test')
        cy.contains('Login')
            .click()
        cy.contains('logged in')
    })

    it('a new blog can be created', function () { 
        cy.contains('Login')
        .click()
        cy.get('#username')
            .type('elaine')
        cy.get('#password')
            .type('test')
        cy.contains('Login')
            .click()
        cy.contains('Create new').click()      
        cy.get('#title')
            .type('A blog created by cypress')
        cy.get('#author')
            .type('Tester')
        cy.get('#url')
            .type('http://url')            
        cy.contains('Create Blog')
            .click()
        cy.contains('A blog created by cypress') 
        }
    )

    it('Blog can be liked', function () { 
        cy.contains('Login')
        .click()
        cy.get('#username')
            .type('elaine')
        cy.get('#password')
            .type('test')
        cy.contains('Login')
            .click()
        cy.contains('Create new').click()      
        cy.get('#title')
            .type('A blog created by cypress')
        cy.get('#author')
            .type('Tester')
        cy.get('#url')
            .type('http://url')            
        cy.contains('Create Blog')
            .click()
        cy.contains('Home')
            .click({ force: true })
        cy.contains('by Tester')
            .click()
        cy.contains('Like')
            .click()
        cy.contains('voted') 
        }
    )
})