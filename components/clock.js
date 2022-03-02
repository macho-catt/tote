import { Transition } from '@headlessui/react';
import { clockStyles } from '../styles/components';
import { toStandard } from '../lib/time';
import { useToggleTime, useGetTimeNow } from '../hooks';

export default function Clock() {
  const { hourVal, minVal, secVal } = useGetTimeNow();
  const [isMilitary, isShowing, toggle] = useToggleTime();

  return (
    <section className={clockStyles.section}>
      <Transition
        show={isShowing}
        enter="transition duration-500"
        enterFrom="-translate-x-12 opacity-0 scale-95"
        enterTo="translate-x-0 opacity-100 scale-100"
        leave="transition duration-300"
        leaveFrom="translate-x-0 opacity-100 scale-100"
        leaveTo="-translate-x-12 opacity-0 scale-95"
      >
        {isMilitary ? (
          <button
            onClick={toggle.toggleTime}
            type="button"
            className={clockStyles.btn}
            data-testid="toStandardBtn"
          >
            <div data-testid="militaryTime">
              {hourVal}:{minVal}:{secVal}
            </div>
          </button>
        ) : (
          <button
            onClick={toggle.toggleTime}
            type="button"
            className={clockStyles.btn}
            data-testid="toMilitaryBtn"
          >
            <div className={clockStyles.standard} data-testid="standardTime">
              {toStandard(hourVal, minVal, secVal)}
            </div>
          </button>
        )}
      </Transition>
    </section>
  );
}
