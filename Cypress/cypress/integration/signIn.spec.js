//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { eq } = require("cypress/types/lodash")
//const { it } = require("mocha")
//const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za Sign in",()=> {
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"
    let invalidEmailFirst = "svetlanamailinator.com"
    let invalidEmailSecond = "svetlana@mailinator.com"
    let invalidPasswordFirst = "12345678"
    let invalidPasswordSecond = "1234"

    beforeEach("visit link", ()=>{
        cy.visit("/")
        cy.url().should("contains", "https://gradebook.vivifyideas")
    })
    it("Visit Sign in page", ()=> {
        cy.get(Locators.Headers.SignIn).eq(0).click()
        cy.url().should("contains", "/login")
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
    })
    it("Sign in with valid data", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(correctEmail)
        cy.get(Locators.SignIn.Password).eq(1).type(correctPassword)
        cy.get(Locators.SignIn.Login).click()
        cy.url().should("contains", "/")
        cy.get(Locators.SignIn.Title).should("have.text", " All Gradebooks Page")
        cy.get(Locators.SignIn.SignOut).eq(2).should("be.visible")
    })
    it("N - Login without email", ()=> {
        cy.get(Locators.SignIn.Password).eq(1).type(correctPassword)
        cy.get(Locators.SignIn.Login).click()
        cy.url().should("contains", "/login")
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Email).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("N - Login with invalid email", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(invalidEmailSecond)
        cy.get(Locators.SignIn.Password).eq(1).type(correctPassword)
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Email).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Email is not valid.")
        })//poruka se ne pojavljuje
    })
    it("N - Login whit invalid email, using email whitout @", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(invalidEmailFirst)
        cy.get(Locators.SignIn.Password).eq(1).type(correctPassword)
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Email).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'svetlanamailinator.com' is missing an '@'.")
        })//poruka se ne pojavljuje
    })
    it("N - Login without password", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(correctEmail)
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Password).eq(1).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("N - Login with invalid password", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(correctEmail)
        cy.get(Locators.SignIn.Password).eq(1).type(invalidPasswordFirst)
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Password).eq(1).then(($input)=> {
            expect($input[0].validationMessage).to.eq("The password is not valid.")
        })//poruka se ne pojavljuje
    })
    it("N - Login with invalid password, using less than 8 characters", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(correctEmail)
        cy.get(Locators.SignIn.Password).eq(1).type(invalidPasswordSecond)
        cy.get(Locators.SignIn.Login).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
        cy.get(Locators.SignIn.Password).eq(1).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please lengthen this text to 8 characters or more (you are currently using 4 characters).")
        })//poruka se ne pojavljuje
    })
    it.only("Sign out", ()=> {
        cy.get(Locators.SignIn.Email).eq(0).type(correctEmail)
        cy.get(Locators.SignIn.Password).eq(1).type(correctPassword)
        cy.get(Locators.SignIn.Login).click()
        cy.url().should("contains", "/")
        cy.get(Locators.SignIn.Title).should("have.text", " All Gradebooks Page")
        cy.get(Locators.SignIn.SignOut).eq(2).click()
        cy.get(Locators.SignIn.TextTitle).should("have.text", "Please login")
        cy.get(Locators.SignIn.Login).should("have.text", "Login")
    })




    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 




})