//const { expect } = require("chai")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
import faker from 'faker'
const Locators = require("../fixtures/Locators.json")


describe ("Testovi za Register",()=> {
    const email = faker.internet.email()
    let firstName = "Svetlana"
    let lastName = "Karaba"
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"
    let correctPasswordConf = "1234test"
    let invalidEmailFirst = "svetlanatestmailinator.com"
    let invalidEmailSecond = "svetlanatest@!mailinator.com"
    let invalidPasswordConf = "1234"
    let invalidPasswordFirst = "1234"
    let invalidPasswordConfFirst = "1234"
    let invalidPasswordSecond = "qwertyui"
    let invalidPasswordConfSecond = "qwertyui"
    let firstName2 = "Neko"
    let lastName2 = "Nesto"
    let correctPassword2 = "1234neki"
    let correctPasswordConf2 = "1234neki"

    beforeEach("visit link", ()=>{
        cy.visit("/")
        cy.url().should("contains", "https://gradebook.vivifyideas")
    })
    it("Visit Register page", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Tearms).should("be.visible")
    })
    it("Register with valid data", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/")
        cy.get(Locators.Register.TextTitle).should("have.text", " All Gradebooks Page")
        cy.get(Locators.Register.SignOut).eq(2).should("be.visible")
    })
    it("N -Register without First Name", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.FirstName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("N-Register without Last Name", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.LastName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("N - Register without password", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).click()
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Your passwords doesn`t match, try again, please")
          })
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
    })
    it("N - Register without password-confirmation", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Your passwords doesn`t match, try again, please")
          })
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
    })
    it("N - Register without password and password-confirmation", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Password).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Password is required.")
        })
    })//poruka se ne pojavljuje
    it("N - Register with wrong password-confirmation", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.PasswordConf).then(($input)=> {
             expect($input[0].validationMessage).to.eq("Please lengthen this text to 8 characters or more (you are currently using 4 characters).")
        })//poruka se ne pojavljuje u cypress
    })
    it("N - Register with invalid password, using only letters", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(invalidPasswordSecond)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConfSecond)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Password).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })
    it("N - Register with invalid password, using less than 8 characters", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(invalidPasswordFirst)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConfFirst)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Password).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please match the requested format.")
        })
    })
    it("N - Register without email", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("N - Register whit invalid email, using email whitout @", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(invalidEmailFirst)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'svetlanatestmailinator.com' is missing an '@'.")
        })
    })
    it("N - Register whit invalid email, using special character", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(invalidEmailSecond)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("A part following '@' should not contain the symbol '!'.")
        })
    })
    it("N - Register without check Terms and Conditions", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName)
        cy.get(Locators.Register.LastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Tearms).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.contains("Register").should("be.visible")
        cy.get(Locators.Register.Tearms).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please check Terms and Conditions.")
        })
    })//uspela sam da se registrujem ali ne bi trebalo
    it.only("Register, another user", ()=> {
        cy.get(Locators.Headers.Register).eq(1).click()
        cy.get(Locators.Register.FirstName).type(firstName2)
        cy.get(Locators.Register.LastName).type(lastName2)
        cy.get(Locators.Register.Password).type(correctPassword2)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf2)
        cy.get(Locators.Register.Email).type(email)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/")
        cy.get(Locators.Register.TextTitle).should("have.text", " All Gradebooks Page")
        cy.get(Locators.Register.SignOut).eq(2).should("be.visible")
    })


    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 



})