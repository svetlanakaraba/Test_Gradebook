//const { should } = require("chai")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")

describe ("Testovi za Create Gradebook",()=> {
    let firstName = "WallE"
    let lastName = "Pixar"
    let correctEmail = "svetlanatest@mailinator.com"
    let correctPassword = "1234test"
    let image1 = "https://cdn.vox-cdn.com/thumbor/zhOkikt7GAARV1YDAYwNQQzeopw=/0x0:1200x808/1400x1400/filters:focal(475x111:667x303):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/55061013/wall_ecover.0.jpg"
    let firstName2 = "Lego"
    let lastName2 = "Creator"
    let image2 = "https://e2k9ube.cloudimg.io/s/cdn/x/https://edienet.s3.amazonaws.com/news/images/full_39190.jpg"
    let image3 = "https://sspeterandpaulsblog.net/4s20/wp-content/uploads/sites/100/2020/06/LEGO.png"
    let title = "High School Classes"
    let comment255 = "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, ssvvdd"
    let comment256 = "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, ssvvddl"

    beforeEach("Logine User", ()=> {
        cy.uloguj(correctEmail, correctPassword)
        cy.wait(2000)
    })
    it("Click on My Gradebook link", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.url().should("contains", "/my-gradebook/11")
        cy.get(Locators.MyGB.TextTitle).should("have.text", "My Gradebook Page")
    })
    it("Click on Add Student button", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.url().should("contains", "/add-student")
        cy.get(".text-left").should("be.visible").and("have.text", "First NameLast Name")
    })
    it("Create Student", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName)
        cy.get(Locators.MyGB.LastName).type(lastName)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image1)
        cy.get(Locators.MyGB.Submit).eq(4).click()
        cy.get(Locators.MyGB.TextTitle).should("have.text", "Single Gradebook Page")
        cy.get(Locators.MyGB.Comment).should("be.visible")
        cy.get(Locators.MyGB.Table).contains("li", "WallE Pixar").should("be.visible").and("have.text", "WallE Pixar")
    })
    it("Create Student with 2 image url", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName2)
        cy.get(Locators.MyGB.LastName).type(lastName2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(3).type(image3)
        cy.get(Locators.MyGB.Submit).eq(7).click()
        cy.get(Locators.MyGB.TextTitle).should("have.text", "Single Gradebook Page")
        cy.get(Locators.MyGB.Comment).should("be.visible")
        cy.get(Locators.MyGB.Table).contains("li", "Lego Creator").should("be.visible").and("have.text", "Lego Creator")
    })
    it("Create Student, functionality of Move image up button", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName2)
        cy.get(Locators.MyGB.LastName).type(lastName2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(3).type(image3)
        cy.get(Locators.MyGB.MoveUp).eq(5).click()
        cy.get(Locators.MyGB.Url).eq(2).should("have.value", image3)
    })
    it("Create Student, functionality of Move image down button", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName2)
        cy.get(Locators.MyGB.LastName).type(lastName2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(3).type(image3)
        cy.get(Locators.MyGB.MoveDown).eq(3).click()
        cy.get(Locators.MyGB.Url).eq(3).should("have.value", image2)
    })
    it("Create Student, functionality of Remove image button", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName2)
        cy.get(Locators.MyGB.LastName).type(lastName2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image2)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(3).type(image3)
        cy.get(Locators.MyGB.Remove).eq(1).click()
        cy.get(Locators.MyGB.Url).should("have.length", "3")
    })
    it("N - Create Student without First Name", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.LastName).type(lastName)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image1)
        cy.get(Locators.MyGB.Submit).eq(4).click()
        cy.get(Locators.MyGB.FirstName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/add-student")
        cy.get(".text-left").should("be.visible").and("have.text", "First NameLast Name")
    })//poruka se ne pojavljuje
    it("N - Create Student without Last Name", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Url).eq(2).type(image1)
        cy.get(Locators.MyGB.Submit).eq(4).click()
        cy.get(Locators.MyGB.LastName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/add-student")
        cy.get(".text-left").should("be.visible").and("have.text", "First NameLast Name")
    })//poruka se ne pojavljuje
    it("N - Create Student without image url", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.FirstName).type(firstName)
        cy.get(Locators.MyGB.LastName).type(lastName)
        cy.get(Locators.MyGB.AddImage).eq(0).click()
        cy.get(Locators.MyGB.Submit).eq(4).click()
        cy.get(Locators.MyGB.Url).eq(2).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        cy.url().should("contains", "/add-student")
        cy.get(".text-left").should("be.visible").and("have.text", "First NameLast Name")
    })
    it("Click on Edit Gradebook button", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.Edit).eq(2).click()
        cy.url().should("contains", "/edit")
        cy.contains("Create Gradebook Page").should("be.visible")
    })
    it("Edit Gradebook, title", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.Edit).eq(2).click()
        cy.get(Locators.MyGB.Title).clear()
        cy.get(Locators.MyGB.Title).type(title)
        cy.get(Locators.MyGB.Submit).click()
        cy.url().should("contains", "/gradebooks")
        cy.get(Locators.MyGB.TextTitle).should("have.text", " All Gradebooks Page")
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.get(Locators.MyGB.Table).contains("td", title).should("be.visible").and("have.text", title)
    })
    it("Add Comments with 255 characters", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.get(Locators.MyGB.TextBox).type(comment255)
        cy.get(Locators.MyGB.Submit).eq(3).click()
        cy.get(Locators.MyGB.TextTitle).should("have.text", "My Gradebook Page")
        cy.get(Locators.MyGB.Comment).should("be.visible")
    })
    it("N - Add Comments with 256 characters", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.get(Locators.MyGB.TextBox).type(comment256)
        cy.get(Locators.MyGB.Submit).eq(3).click()
        cy.get(Locators.MyGB.TextBox).then(($input)=> {
            expect($input[0].validationMessage).to.eq("The limit is 255 characters.")
        })
    })//poruka se ne pojavljuje
    it("Delete Comments", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.Delete).eq(3).click()
        cy.on("window:confirm", (str) => {
            expect(str).to.equal("Are you sure?")
          })
        cy.get(Locators.MyGB.Comment).contains("p").should("not.be.visible")
        cy.url().should("contains", "/my-gradebook")
    })
    it("Delete Gradebook", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.Delete).eq(1).click()
        cy.on("window:confirm", (str) => {
            expect(str).to.equal("Are you sure?")
          })
    })
    it.only("Checking of deleting Gradebook", ()=> {
        cy.get(Locators.Headers.MyGB).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.MyGB.AddStudent).eq(0).click()
        cy.get(Locators.MyGB.Message).should("be.visible").and("have.text", '\n      Message: You dont have your diary. Please first set your own diary\n    ')
    })





    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    }) 



})