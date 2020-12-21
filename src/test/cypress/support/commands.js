// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const Pouch = require("pouchdb").default;

Cypress.Commands.add("deleteIndexedDB", (name) => {
  return new Pouch(name).destroy();
  // return new Promise((resolve, reject) => {
  //   cy.log(`starting deletion of ${name}`);
  //   var DBDeleteRequest = cy.window().indexedDB.deleteDatabase(name);
  //   DBDeleteRequest.onerror = function (event) {
  //     cy.log(`error`);
  //     resolve();
  //     // reject(event);
  //   };
  //   DBDeleteRequest.onsuccess = function (event) {
  //     cy.log(`success`);
  //     resolve();
  //   };
  // });
});
