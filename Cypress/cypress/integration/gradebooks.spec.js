//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za Gradebooks",()=> {
    let title = "High School Classes"
    let title2 = "Chili Peppers"
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"

    beforeEach("Logine User", ()=> {
        cy.uloguj(correctEmail, correctPassword)
        cy.wait(2000)
    })
    it("Click on My Gradebook link", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.url().should("contains", "/gradebooks")
        cy.get(Locators.Gradebooks.TextTitle).should("have.text", " All Gradebooks Page")
    })
    it("Gradebook Filter", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get(Locators.Gradebooks.Filter).type(title)
        cy.get(Locators.Gradebooks.Search).eq(0).click()
        cy.get(Locators.Gradebooks.Table).contains("td", title).should("be.visible").and("have.text", '\n              High School Classes\n            ')
    })
    it("N - Gradebook Filter with invalid name", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get(Locators.Gradebooks.Filter).type(title2)
        cy.get(Locators.Gradebooks.Search).eq(0).click()
        cy.contains("There is no more gradebooks in base, try again").should("be.visible").and("have.text", "There is no more gradebooks in base, try again")
    })
    it("Gradebook Pagination", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get("tbody>tr").should("be.visible").and("have.length", "10")
        cy.get(Locators.Gradebooks.Next).eq(2).should("be.visible").and("not.to.be.disabled")
        cy.get(Locators.Gradebooks.Previous).eq(1).should("be.visible").and("be.disabled")
    })
    it("Gradebook Pagination, Next button", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get(Locators.Gradebooks.Next).eq(2).click()
        cy.get("tbody>tr").should("be.visible").and("have.length", "10")
        cy.get(Locators.Gradebooks.Previous).eq(1).should("be.visible").and("not.to.be.disabled")
        cy.get(Locators.Gradebooks.Next).eq(2).should("be.visible")
    })
    it("Gradebook Pagination, Previous button", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get(Locators.Gradebooks.Next).eq(2).click()
        cy.get(Locators.Gradebooks.Previous).eq(1).click()
        cy.get("tbody>tr").should("be.visible").and("have.length", "10")
        cy.get(Locators.Gradebooks.Previous).eq(1).should("be.visible").and("be.disabled")
        cy.get(Locators.Gradebooks.Next).eq(2).should("be.visible").and("not.to.be.disabled")
    })
    it("Single Professor Page", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get("tbody>tr>td>a").eq(1).click()
        cy.contains("Single Professor Page").should("be.visible").and("have.text", "Single Professor Page")
        cy.get(Locators.Gradebooks.Table).should("be.visible")
    })
    it("N - User can Add a student to another user Gradebook", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get("tbody>tr>td>a").eq(0).click()
        cy.get(Locators.Gradebooks.AddStudent).eq(0).click()
        cy.get(Locators.Gradebooks.Message).should("be.visible").and("have.text", "You have no authorization for this action.")
    })//uspela sam da udjem u Add Student ali ne bi trebalo
    it("N - User can Edit another user Gradebook", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get("tbody>tr>td>a").eq(0).click()
        cy.wait(2000)
        cy.get(Locators.Gradebooks.Edit).eq(2).click()
        cy.get(Locators.Gradebooks.Message).should("be.visible").and("have.text", "You have no authorization for this action.")
    })//uspela sam da udjem u Edit ali ne bi trebalo
    it.only("N - User can Delete another user Gradebook", ()=> {
        cy.get(Locators.Headers.Gradebooks).eq(0).click()
        cy.get("tbody>tr>td>a").eq(0).click()
        cy.wait(2000)
        cy.get(Locators.Gradebooks.Delete).eq(1).click()
        cy.get(Locators.Gradebooks.Message).should("be.visible").and("have.text", "You have no authorization for this action.")
    })//uspela sam da izbrisem gradebook ali ne bi trebalo



    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 



})