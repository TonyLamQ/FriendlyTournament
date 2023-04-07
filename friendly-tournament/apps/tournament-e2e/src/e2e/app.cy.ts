import { getGreeting } from '../support/app.po';

describe('tournament', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // basic test, just to make sure the app is running
  it('should display welcome message', () => {
    getGreeting().contains('FriendlyTournament');
  });
});
