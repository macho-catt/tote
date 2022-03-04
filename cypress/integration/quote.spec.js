describe('Quote', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders an initial quote', () => {
    cy.get('[data-testid="currQuote"]').should('be.visible');
  });
});

// const superagent = require("superagent")
// const mockServer = require("mockttp").getLocal();

// describe('Mockttp', () => {
//   // Start mock server
//   beforeEach(async () => {
//     mockServer.start(8080)
//     await mockServer.forGet('/mocked-path').thenReply(200, {
//       q: 'Test quote',
//       a: 'Test author'
//     })
//   })

//   afterEach(async () => {
//     mockServer.stop()
//   })

//   it('mocks a request for SSR', () => {
//     cy.request('GET', 'http://0.0.0.0:3000/', {
//       method: 'GET',
//       path: '/mocked-path'
//     })

//     browser.load('/')

//   })
// })
