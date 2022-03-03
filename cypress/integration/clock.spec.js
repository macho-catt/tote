import dayjs from 'dayjs';
import { toStandard } from '../../lib/time';

describe('Clock', () => {
  let hour;
  let min;
  let sec;

  beforeEach(() => {
    cy.visit('/');
    cy.clock();
  });

  it('should initially render the correct time', () => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    cy.contains(`${hour}:${min}:${sec}`);
  });

  it('should render the correct time after five seconds', () => {
    cy.tick(5000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    cy.contains(`${hour}:${min}:${sec}`);
  });

  it('should render the time in standard time after the button click', () => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    cy.contains(`${hour}:${min}:${sec}`);

    cy.get('[data-testid="toStandardBtn"]').click();
    cy.tick(1000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    const standardTime = toStandard(hour, min, sec);
    cy.contains(standardTime);
  });

  it.only('should toggle between military and standard time', () => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    cy.contains(`${hour}:${min}:${sec}`);

    cy.get('[data-testid="toStandardBtn"]').click();
    cy.tick(1000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    const standardTime = toStandard(hour, min, sec);
    cy.contains(standardTime);

    cy.get('[data-testid="toMilitaryBtn"]').click();
    cy.tick(1000);
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');
    cy.contains(`${hour}:${min}:${sec}`);
  });
});
