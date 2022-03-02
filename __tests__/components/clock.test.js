/* eslint react/jsx-no-constructed-context-values: 0 */

import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { ClockContext } from '../../pages/index';
import { Clock } from '../../components';
import { toStandard } from '../../lib/time';

describe('clock', () => {
  let hour;
  let min;
  let sec;
  let setHour;
  let setMin;
  let setSec;

  beforeEach(() => {
    hour = dayjs().format('HH');
    min = dayjs().format('mm');
    sec = dayjs().format('ss');

    const timeValue = {
      hour: [hour, setHour],
      min: [min, setMin],
      sec: [sec, setSec],
    };

    render(
      <ClockContext.Provider value={timeValue}>
        <Clock />
      </ClockContext.Provider>
    );
  });

  it('should render the current time as military time', () => {
    expect.assertions(1);
    expect(screen.getByText(`${hour}:${min}:${sec}`)).toBeInTheDocument();
  });

  it('should render the current time as standard time', async () => {
    expect.assertions(1);
    const button1 = screen.getByTestId('toStandardBtn');
    fireEvent.click(button1);

    const standardTime = toStandard(hour, min, sec);
    await waitFor(() => {
      expect(screen.getByText(standardTime)).toBeInTheDocument();
    });
  });

  // it.skip('should toggle between military and standard time', async () => {
  //   // expect.assertions(1);

  //   const button1 = screen.getByTestId('toStandardBtn');
  //   fireEvent.click(button1);

  //   const textInStandard = await screen.findByTestId("standardTime");
  //   expect(textInStandard).toBeInTheDocument();

  //   const button2 = await screen.findByTestId('toMilitaryBtn');
  //   fireEvent.click(button2);

  //   const textInMilitary = await screen.findByTestId("militaryTime");
  //   expect(textInMilitary).toBeInTheDocument();

  //   // await waitFor(() => {
  //   //   expect(screen.getByText(`${hour}:${min}:${sec}`)).toBeInTheDocument();
  //   // })
  // })
});
