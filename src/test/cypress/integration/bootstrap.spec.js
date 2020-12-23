/// <reference types="cypress" />

const Pouch = require("pouchdb").default;

const trees_main = require("../../../predefined/trees/main.json");
const trees_docs = require("../../../predefined/trees/docs.json");

describe("create new database", () => {
  // beforeEach(async () => {
  //   await cy.deleteIndexedDB("trees");
  // });

  it("should allow creation of new template, view and document", async () => {
    cy.visit("/");
    cy.deleteIndexedDB("trees");
    // new Pouch("trees")
    //   .destroy()
    //   .then(() => console.log("'trees' db deleted"))
    //   .catch((e) => console.log(e));
    // cy.visit("/trees/view/all");

    cy.visit("/trees/create/builtin:template/main");
    // cy.get("div#template > input").type("{selectall}{backspace}");
    // cy.get("div#template > input").type("blah");
    cy.get("div#content textarea").type("{selectall}{backspace}");
    cy.get("div#content textarea").type(JSON.stringify(trees_main.content), {
      parseSpecialCharSequences: false,
    });

    cy.contains("Save").click();
    cy.get(".log").contains("saved");

    cy.visit("/trees/create/builtin:view/docs");
    cy.get("div#type input").type("list");
    cy.get("div#index textarea").type("{selectall}{backspace}");
    cy.get("div#index textarea").type(JSON.stringify(trees_docs.index), {
      parseSpecialCharSequences: false,
    });
    cy.get("div#selector textarea").type("{selectall}{backspace}");
    cy.get("div#selector textarea").type(JSON.stringify(trees_docs.selector), {
      parseSpecialCharSequences: false,
    });
    cy.get("div#columns textarea").type("{selectall}{backspace}");
    cy.get("div#columns textarea").type(JSON.stringify(trees_docs.columns), {
      parseSpecialCharSequences: false,
    });
    cy.contains("Save").click();
    cy.get(".log").contains("saved");

    cy.contains("Cancel").click();
    cy.contains("Back to View").click();
    cy.contains("Create a New Doc").click();
    cy.get("div#name input").type("Birch");
    cy.get("div#summary textarea").type("which is a kind of");
    cy.get("div#description textarea").type("tree");
    cy.contains("Save").click();
    cy.get(".button_disabled").contains("Save");
    cy.get("div#some_number.field_error").contains("required");

    cy.get("div#some_number input").type("1").blur();
    cy.get(".button_disabled").contains("Save");
    cy.get("div#some_number.field_error").contains(
      "below minimum allowed value: 4"
    );
    cy.get("div#some_number input").type("{backspace}11").blur();
    cy.get(".button_disabled").contains("Save");
    cy.get("div#some_number.field_error").contains(
      "above maximum allowed value: 10"
    );

    cy.get("div#some_number input").type("{backspace}{backspace}10").blur();

    cy.contains("Save").click();
    cy.get(".log").contains("saved");

    cy.contains("Cancel").click();
  });
});
