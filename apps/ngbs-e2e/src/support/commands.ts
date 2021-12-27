// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void
    getBySel(selector: string): Chainable
    clearFirebaseAuth(): Promise<void>
    clearIndexedDB(): Promise<void>
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password)
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})

Cypress.Commands.add('clearFirebaseAuth', () => {
  console.log('clearFirebaseAuth')
  const promise = new Promise<void>((resolve) => {
    console.log('promise')
    indexedDB.databases().then((info) => console.log(info))
    indexedDB.deleteDatabase('firebaseLocalStorage')
    const req = indexedDB.deleteDatabase('firebaseLocalStorageDb')
    req.onsuccess = function () {
      console.log('onsuccess')
      resolve()
    }
    req.onerror = function () {
      console.log('onerror')
      resolve()
    }
    req.onblocked = function () {
      console.log('onblocked')
      resolve()
    }
    req.onupgradeneeded = function () {
      console.log('onupgradeneeded')
      resolve()
    }
  })
  return promise
})

Cypress.Commands.add('clearIndexedDB', async () => {
  const databases = await window.indexedDB.databases()

  await Promise.all(
    databases.map(
      ({ name }) =>
        new Promise((resolve, reject) => {
          const request = window.indexedDB.deleteDatabase(`${name}`)
          request.addEventListener('success', resolve)
          // Note: we need to also listen to the "blocked" event
          // (and resolve the promise) due to https://stackoverflow.com/a/35141818
          request.addEventListener('blocked', resolve)
          request.addEventListener('error', reject)
          setTimeout(resolve, 3500)
        })
    )
  )
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
