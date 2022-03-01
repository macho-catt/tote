import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
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
      <Dialog
        className={infoStyles.dialog}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Overlay className={infoStyles.overlay} />
        <div className={infoStyles.container}>
          <Dialog.Title as="h1" className={infoStyles.title}>
            tote
          </Dialog.Title>
          <Dialog.Description className={infoStyles.desc}>
            <p>
              tote (time + quote) displays a changing background color based on
              the current time of day. Every minute, a new quote appears on the
              screen.
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
              However, this website does not exist anymore, so I made a similar
              project that also shows an inspirational quote.
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
                href="mattcacho.com"
                className={infoStyles.a}
                target="_blank"
                rel="noopener noreferrer"
              >
                Matt&apos;s website
              </a>
            </div>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
