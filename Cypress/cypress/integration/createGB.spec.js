//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za Create Gradebook",()=> {
    let title = "High school"
    let profesor = "Svetlana Karaba"
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"

    beforeEach("Logine User", ()=> {
        cy.uloguj(correctEmail, correctPassword)
        cy.wait(2000)
    })
    it("Click on Create Gradebook link", ()=> {
        cy.get(Locators.Headers.CreateGB).eq(2).click()
        cy.url().should("contains", "/create-gradebook")
        cy.contains("Create Gradebook Page").should("be.visible")
    })
    it("Create Gradebook", ()=> {
        cy.get(Locators.Headers.CreateGB).eq(2).click()
        cy.get(Locators.CreateGB.Title).type(title)
        cy.get(Locators.CreateGB.Professor).select("11", profesor)
        cy.get(Locators.CreateGB.Submit).click()
        cy.wait(2000)
        cy.url().should("contains", "/gradebooks")
        cy.get(Locators.CreateGB.TextTitle).should("have.text", " All Gradebooks Page")
    })
    it("Checking if Gradebook is created", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.get(Locators.CreateGB.TextTitle).should("have.text", "My Gradebook Page")
        cy.get(Locators.CreateGB.Table).contains("td", title).should("be.visible").and("have.text", title)
    })
    it("N - Create Gradebook without Gradebook title", ()=> {
        cy.get(Locators.Headers.CreateGB).eq(2).click()
        cy.get(Locators.CreateGB.Professor).select("11", profesor)
        cy.get(Locators.CreateGB.Submit).click()
        cy.get(Locators.CreateGB.Message).should("be.visible").and("have.text", '\n        Message: The given data was invalid.\n        \n          [\n  "The title field is required."\n]\n        ')
        cy.url().should("contains", "/create-gradebook")
        cy.contains("Create Gradebook Page").should("be.visible")
    })
    it("N - Create Gradebook without Professor", ()=> {
        cy.get(Locators.Headers.CreateGB).eq(2).click()
        cy.get(Locators.CreateGB.Title).type(title)
        cy.get(Locators.CreateGB.Submit).click()
        cy.get(Locators.CreateGB.Message).should("be.visible").and("have.text", '\n        Message: The given data was invalid.\n        \n          [\n  "The professor id field is required."\n]\n        ')
        cy.url().should("contains", "/create-gradebook")
        cy.contains("Create Gradebook Page").should("be.visible")
    })
    it.only("N - Create Gradebook with empty fields", ()=> {
        cy.get(Locators.Headers.CreateGB).eq(2).click()
        cy.get(Locators.CreateGB.Submit).click()
        cy.get(Locators.CreateGB.Message).should("be.visible").and("have.text", '\n        Message: The given data was invalid.\n        \n          [\n  "The title field is required."\n]\n        \n          [\n  "The professor id field is required."\n]\n        ')
    })



    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 



})