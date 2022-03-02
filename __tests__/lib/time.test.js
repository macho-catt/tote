import { toStandard } from '../../lib/time';

describe('time library', () => {
  it('should display noon properly', () => {
    expect.assertions(1);
    const time = toStandard(12, 0, 0);
    expect(time).toBe('12:0:0 pm');
  });

  it('should display midnight properly', () => {
    expect.assertions(1);
    const time = toStandard(0, 0, 0);
    expect(time).toBe('12:0:0 am');
  });

  it('should display am properly', () => {
    expect.assertions(1);
    const time = toStandard(7, 30, 30);
    expect(time).toBe('7:30:30 am');
  });

  it('should display pm properly', () => {
    expect.assertions(1);
    const time = toStandard(19, 30, 30);
    expect(time).toBe('7:30:30 pm');
  });
});
