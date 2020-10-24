//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za Create Professor",()=> {
    let firstName = "Svetlana"
    let lastName = "Karaba"
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"
    let image1 = "https://thumbs.dreamstime.com/z/professor-lecturer-illustration-cartoon-isolated-personage-34508406.jpg"
    let image2 = "https://i.pinimg.com/originals/84/73/20/847320549b5c942b8484d6a76fc48d33.jpg"
    let image3 = "https://www.nicepng.com/png/detail/354-3544353_professor-smartenstein-cartoon-professor.png"
    let invalidimage = "https://www.clipartmax.com/png/middle/33-338688_most-popular-categories-lecturer-cartoon"

    beforeEach("Logine User", ()=> {
        cy.uloguj(correctEmail, correctPassword)
        cy.wait(2000)
    })
    it("Click on Create Professors link", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.url().should("contains", "/create-professor")
        cy.get(Locators.Professor.FirstName).should("be.visible")
    })
    it("Create Professor", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(image1)
        cy.get(Locators.Professor.Submit).eq(4).click()
        cy.url().should("contains", "/all-professors")
        cy.get(Locators.Professor.TextTitle).should("have.text", "All Professors Page")
    })
    it("Create Professor with 3 image url", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(image1)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).eq(1).type(image2)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).eq(2).type(image3)
        cy.get(Locators.Professor.Submit).eq(10).click()
        cy.url().should("contains", "/all-professors")
        cy.get(Locators.Professor.TextTitle).should("have.text", "All Professors Page")
    })
    it("N - Create Professor without First Name", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.Submit).eq(1).click()
        cy.get(Locators.Professor.FirstName).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/create-professor")
        cy.get(Locators.Professor.FirstName).should("be.visible")
    })
    it("N - Create Professor without Last Name", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.Submit).eq(1).click()
        cy.get(Locators.Professor.LastName).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/create-professor")
        cy.get(Locators.Professor.FirstName).should("be.visible")
    })
    it("N - Create Professor without image url", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Submit).eq(4).click()
        cy.get(Locators.Professor.Url).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/create-professor")
        cy.get(Locators.Professor.FirstName).should("be.visible")
    })
    it("N - Create Professor with invalid image type", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(invalidimage)
        cy.get(Locators.Professor.Submit).eq(4).click()
        cy.get(Locators.Professor.Url).eq(0).then(($input)=> {
            expect($input[0].validationMessage).to.eq("The image type is not valid.")
        })
        cy.url().should("contains", "/create-professor")
        cy.get(Locators.Professor.FirstName).should("be.visible")
    })// uspela sam da kreiram profesora ali ne bi tebalo
    it("Create Professor, functionality of Move image up button", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(image1)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).eq(1).type(image2)
        cy.get(Locators.Professor.MoveUp).eq(5).click()
        cy.get(Locators.Professor.Url).eq(0).should("have.value", image2)
    })
    it("Create Professor, functionality of Move image down button", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(image1)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).eq(1).type(image2)
        cy.get(Locators.Professor.MoveDown).eq(3).click()
        cy.get(Locators.Professor.Url).eq(1).should("have.value", image1)
    })
    it("Create Professor, functionality of Remove image button", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.CreateProf).eq(1).click()
        cy.get(Locators.Professor.FirstName).type(firstName)
        cy.get(Locators.Professor.LastName).type(lastName)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).type(image1)
        cy.get(Locators.Professor.AddImage).eq(0).click()
        cy.get(Locators.Professor.Url).eq(1).type(image2)
        cy.get(Locators.Professor.Remove).eq(4).click()
        cy.get(Locators.Professor.Url).should("have.length", "1")
    })
    it("Click on All Professors link", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.AllProf).eq(0).click()
        cy.url().should("contains", "/all-professors")
        cy.get(Locators.Professor.TextTitle).should("have.text", "All Professors Page")
    })
    it.only("Search professor in Professors filter", ()=> {
        cy.get(Locators.Headers.Professor).eq(3).click()
        cy.get(Locators.Professor.AllProf).eq(0).click()
        cy.wait(2000)
        cy.get(Locators.Professor.Filter).type("Svetlana")
        cy.get(Locators.Professor.Table).contains("td", "Svetlana").should("be.visible").and("have.text", "Svetlana")
    })


    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 




})