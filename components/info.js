import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { infoStyles } from '../styles/components';

export default function Info() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={infoStyles.section}>
      <button
        className={infoStyles.question}
        type="button"
        onClick={handleClick}
      >
        ?
      </button>
      <Transition show={isOpen}>
        <Dialog
          className={infoStyles.dialog}
          // open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay transition */}
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={infoStyles.container}
          >
            <Dialog.Overlay className={infoStyles.overlay} />
          </Transition.Child>

          {/* Modal body transition */}
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className={infoStyles.container}
          >
            {/* <div className={infoStyles.container}> */}
            <Dialog.Title as="h1" className={infoStyles.title}>
              tote
            </Dialog.Title>
            <Dialog.Description as="div" className={infoStyles.desc}>
              <p>
                tote (time + quote) displays a changing background color based
                on the current time of day. Every minute, a new quote appears on
                the screen.
              </p>
              <p>
                This project was initially inspired by{' '}
                <a
                  href="https://web.archive.org/web/20160516170454/http://whatcolourisit.scn9a.org/"
                  className={infoStyles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  What colour is it,
                </a>{' '}
                a similar website that mapped the current time to a color.
                However, this website does not exist anymore, so I made a
                similar project that also shows an inspirational quote.
              </p>
              <p>
                The math for mapping the current time to color is based on the
                calculations used on Calvin Walton&apos;s (kepstin){' '}
                <a
                  href="https://github.com/kepstin/colourclock"
                  className={infoStyles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Project,
                </a>{' '}
                and the quotes are obtained through an API request to{' '}
                <a
                  href="https://zenquotes.io/"
                  className={infoStyles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  zenquotes.io
                </a>
                .
              </p>
            </Dialog.Description>
            <div className={infoStyles.links}>
              <div>
                <a
                  href="https://github.com/macho-catt/tote"
                  className={infoStyles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Built with Next.js
                </a>
              </div>
              <div>
                <a
                  href="https://www.mattcacho.com"
                  className={infoStyles.a}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Matt&apos;s website
                </a>
              </div>
            </div>
            {/* </div> */}
          </Transition.Child>
        </Dialog>
      </Transition>
    </section>
  );
}
