import { getGreeting } from '../support/app.po';

describe('tournament', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // basic test, just to make sure the app is running
  it('should display welcome message', () => {
    getGreeting().contains('FriendlyTournament');
  });

  it('Should view userList', function() {
    cy.get('.md\\:flex > :nth-child(3) > .hover\\:text-gray-200').click();
  });


  it('should login', function() {

    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('[routerlink="login"]').click({force: true});
    cy.get('#email').clear('Cypress@gmail.com');
    cy.get('#email').type('Cypress@gmail.com');
    cy.get('#password').clear('C');
    cy.get('#password').type('Cypress');
    cy.get('.btn').click();

    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('div.py-1 > :nth-child(3)').click({force: true});
  });
});

describe('tournament2', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('[routerlink="login"]').click({force: true});
    cy.get('#email').clear('Cypress@gmail.com');
    cy.get('#email').type('Cypress@gmail.com');
    cy.get('#password').clear('C');
    cy.get('#password').type('Cypress');
    cy.get('.btn').click();
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('getProfile', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('li > .text-sm').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create and delete tournament', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > .hover\\:text-gray-200').click();
    cy.get(':nth-child(1) > .hover\\:text-gray-200').click();
    cy.get('.btn').click();
    cy.get('#Name').clear('Cypress\' tournament');
    cy.get('#Name').type('Cypress\' tournament');
    cy.get('#Game').clear('Coding');
    cy.get('#Game').type('Coding');
    cy.get('#Date').click();
    cy.get('#Date').type('2024-06-01T08:30');
    cy.get('.form-row').click();
    cy.get('.btn-primary').click({force: true});
    cy.get('.flex > [tabindex="0"]').click();
    cy.get('.me-2 > .btn').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Create and delete Group', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > .hover\\:text-gray-200').click();
    cy.get('.md\\:flex > :nth-child(2) > .hover\\:text-gray-200').click();
    cy.get('.btn').click();
    cy.get('#groupName').clear('Cypress\' Group');
    cy.get('#groupName').type('Cypress\' Group');
    cy.get('#groupDescription').clear('This group is from Cypress');
    cy.get('#groupDescription').type('This group is from Cypress');
    cy.get('.btn-primary').click();
    cy.get('.flex > [tabindex="0"]').click();
    cy.get('.btn-primary').click();
    cy.get('.border-4 > :nth-child(1) > :nth-child(3)').click();
    cy.get('#groupDescription').clear();
    cy.get('#groupDescription').type('This group is from Cypress edited desc.');
    cy.get('.btn-primary').click();
    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('li > .text-sm').click();
    cy.get('.ms-4').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Should Befriend and unfriend ', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > .hover\\:text-gray-200').click();
    cy.get('.md\\:flex > :nth-child(3) > .hover\\:text-gray-200').click();
    cy.get(':nth-child(3) > .focus\\:outline-none.py-2 > .lg\\:flex > .lg\\:w-4\\/12 > .px-2 > .flex > .ml-3').click();
    cy.get('.pe-3 > .h-6').click();
    cy.get('.px-2 > .flex > .py-2').click();
    /* ==== End Cypress Studio ==== */
  });
});
