const infoStyles = {
  section: [
    'fixed',
    'top-0',
    'flex',
    'flex-col',
    'w-screen',
    '-ml-10',
    'lg:mx-0',
  ].join(' '),

  question: [
    'mt-4',
    'mr-6',
    'h-6',
    'w-6',
    'border',
    'border-current',
    'rounded-lg',
    'self-end',
    'z-20',
    'lg:mt-2',
    'lg:mr-0',
    'lg:place-self-center',
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

  title: ['mt-4', 'text-xl', 'lg:text-4xl'].join(' '),

  desc: [
    'mx-6',
    'text-left',
    'flex',
    'flex-col',
    'gap-3',
    'text-sm',
    'md:text-base',
    'lg:gap-4',
    'lg:mx-10',
  ].join(' '),

  links: [
    'mx-6',
    'my-4',
    'flex',
    'flex-row',
    'justify-self-end',
    'justify-between',
    'lg:mx-10',
    'lg:my-10',
  ].join(' '),

  a: ['text-blue-800', 'lg:hover:text-emerald-600'].join(' '),
};

export default infoStyles;
