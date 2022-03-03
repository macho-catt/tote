<h1 align="center">
  tote
</h1>

tote (time + quote) displays a changing background color based on the current time of day. Every minute, a new quote appears on the screen.

## Tech

- Next.js
- Tailwind CSS
- Headless UI
- ESLint
- Prettier
- Husky
- Lint-Staged
- Jest
- React Testing Library
- Cypress
- Vercel

## Installation and Setup

1. Clone the project
```
git clone https://github.com/macho-catt/tote.git
```

2. Install dependencies
```
npm install
```

3. Run locally
```
npm run dev
```

## Inspiration

This project was initially inspired by [What colour is it](https://web.archive.org/web/20160516170454/http://whatcolourisit.scn9a.org/), a similar website that mapped the current time to a color. However, this website does not exist anymore, so I made a similar project that also shows an inspirational quote.

## References

The math for mapping the current time to color is based on the calculations used on Calvin Walton's (kepstin) [GitHub Project](https://github.com/kepstin/colourclock), and the quotes are obtained through an API request to [zenquotes.io](https://zenquotes.io/).

## Todo

- [ ] Incorporate testing with Github Actions after a push / pull request
- [ ] Image for SEO
- [ ] Loading screen
- [ ] Potentially switch from SSR (server side render) to a statically generated site with on-demand revalidation. This option would need to use local storage instead of memory for storing the list of quotes
