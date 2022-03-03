import dayjs from 'dayjs';
import { transformToColor, getLuminance } from '../../lib/colors';

describe('ColorInfo', () => {
  let hour;
  let min;
  let sec;

  beforeEach(() => {
    cy.visit('/');
    cy.clock();
  });

  it('renders the correct color and luminance', () => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    const hex = transformToColor(hour, min, sec);
    const luminance = getLuminance(hour, min, sec);
    cy.contains(`Hex color: ${hex}`);
    cy.contains(`Luminance: ${luminance.toFixed(4)}`);
  });

  it('renders the correct color and luminance after the time changes', () => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    let hex = transformToColor(hour, min, sec);
    let luminance = getLuminance(hour, min, sec);
    cy.contains(`Hex color: ${hex}`);
    cy.contains(`Luminance: ${luminance.toFixed(4)}`);

    cy.tick(1000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    hex = transformToColor(hour, min, sec);
    luminance = getLuminance(hour, min, sec);
    cy.contains(`Hex color: ${hex}`);
    cy.contains(`Luminance: ${luminance.toFixed(4)}`);
  });
});
