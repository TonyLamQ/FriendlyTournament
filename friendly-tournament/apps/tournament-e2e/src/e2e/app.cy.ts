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

  it('getProfile', function() {
    cy.get('#dropdownNavbarLink > .h-6').click();
    cy.get('li > .text-sm').click();
  });

  it('1', function() {
    cy.get(':nth-child(4) > .hover\\:text-gray-200').click();
    cy.get('.md\\:flex > :nth-child(3) > .hover\\:text-gray-200').click();
    cy.get(':nth-child(2) > .focus\\:outline-none.py-2 > .lg\\:flex > .lg\\:w-4\\/12 > .px-2 > .flex > .ml-3').click();
    cy.get('.pe-3 > .h-6').click();
    cy.get('.px-2 > .flex > .py-2').click();
  });
});
