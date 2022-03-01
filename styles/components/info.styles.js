const infoStyles = {
  section: ['fixed', 'top-0', 'flex', 'flex-col', 'w-screen'].join(' '),

  question: [
    'mt-2',
    'h-6',
    'w-6',
    'border',
    'border-current',
    'rounded-lg',
    'place-self-center',
    '-ml-20',
    'lg:mx-0',
    'lg:hover:text-2xl',
    'lg:hover:h-8',
    'lg:hover:w-8',
  ].join(' '),

  dialog: [
    'fixed',
    'z-10',
    'inset-0',
    'overflow-y-auto',
    'w-screen',
    'text-center',
    'flex',
    'flex-col',
  ].join(' '),

  overlay: ['fixed', 'inset-0', 'bg-black', 'opacity-30'].join(' '),

  container: [
    'relative',
    'place-self-center',
    'flex',
    'flex-col',
    'gap-4',
    'rounded-lg',
    'mt-20',
    'bg-slate-300',
    'w-5/6',
    'lg:w-2/6',
  ].join(' '),

  title: ['mt-4', 'text-3xl', 'lg:text-4xl'].join(' '),

  desc: [
    'mx-6',
    'text-left',
    'flex',
    'flex-col',
    'gap-3',
    'lg:gap-4',
    'lg:mx-10',
  ].join(' '),

  links: [
    'mx-6',
    'my-10',
    'flex',
    'flex-row',
    'justify-self-end',
    'justify-between',
    'lg:mx-10',
  ].join(' '),

  a: ['text-blue-800', 'lg:hover:text-emerald-600'].join(' '),
};

export default infoStyles;
