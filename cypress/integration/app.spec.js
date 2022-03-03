import dayjs from 'dayjs';
import { transformToColor, getLuminance } from '../../lib/colors';

describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app and show content', () => {
    cy.contains('?');
    cy.contains('Hex color:');
    cy.contains('Luminance:');
    cy.get('[type="button"]').should('have.length', 2);
  });
});

describe('Time and color mapping', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clock();
  });

  it('should have the correct background and text colors', () => {
    cy.tick(1000);
    const hour = dayjs().format('HH');
    const min = dayjs().format('mm');
    const sec = dayjs().format('ss');
    const hex = transformToColor(hour, min, sec);
    const luminance = getLuminance(hour, min, sec);
    const textColor = luminance > 127.5 ? 'black' : 'white';

    cy.get('[id="root"]').should('have.backgroundColor', `${hex}`);
    cy.get('[id="root"]').should('have.color', `${textColor}`);
  });

  it('should have the correct background and text colors after a time change', () => {
    cy.tick(1000);
    let hour = dayjs().format('HH');
    let min = dayjs().format('mm');
    let sec = dayjs().format('ss');
    let hex = transformToColor(hour, min, sec);
    let luminance = getLuminance(hour, min, sec);
    let textColor = luminance > 127.5 ? 'black' : 'white';

    cy.get('[id="root"]').should('have.backgroundColor', `${hex}`);
    cy.get('[id="root"]').should('have.color', `${textColor}`);

    cy.tick(2000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    hex = transformToColor(hour, min, sec);
    luminance = getLuminance(hour, min, sec);
    textColor = luminance > 127.5 ? 'black' : 'white';

    cy.get('[id="root"]').should('have.backgroundColor', `${hex}`);
    cy.get('[id="root"]').should('have.color', `${textColor}`);
  });
});
