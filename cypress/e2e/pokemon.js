describe('Pokemon test', () => {

  beforeEach(() => {
    cy.server()
    cy.fixture("../fixtures/listPokemon.json").as("listPokemon")
    cy.route('GET', "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0", "@listPokemon").as("getListPokemon")
    cy.visit('/')
  })

  context("When user visit pokemon homepage", () => {
    it('should show list pokemon card correctly', () => {
      cy.wait('@getListPokemon')
      cy.get('[data-cy=pokemon-card-1]').should("be.visible")
    })
  })
})