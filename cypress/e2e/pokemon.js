const recursiveCatchPokemon = () => {
  cy.get('[data-cy=container-button-catcher-1]').click()

  cy.get('[data-cy="modal-title"]').then(($title) => {
    if($title.text().includes('Success')){
      cy.get('[data-cy="input-username"]').type('hahaha');
      cy.get("[data-cy='button-username']").click()
    } else {
      cy.get('[data-cy="button-close"]').click();
      recursiveCatchPokemon()
    }
  })
}

describe('Pokemon test', () => {

  beforeEach(() => {
    cy.server()
    cy.fixture("../fixtures/listPokemon.json").as("listPokemon");
    cy.fixture("../fixtures/singlePokemon.json").as("singlePokemon");
    cy.route('GET', "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0", "@listPokemon").as("getListPokemon")
    cy.route('GET', 'https://pokeapi.co/api/v2/pokemon/1', "@singlePokemon").as("getSinglePokemon");
  })

  it('should show list pokemon card correctly', () => {
    cy.clearLocalStorage('dictionaryPokemon')
    cy.clearLocalStorage('myPokemonData')
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('/')
    cy.wait('@getListPokemon')
    for (let i = 1; i < 21; i++){
      cy.get(`[data-cy=pokemon-card-${i}]`).should("be.visible")
      cy.get('[data-cy="container-home-page"]').scrollTo(0, i * 15)
    }
  })

  it("should catch pokemon", () => {
    cy.clearLocalStorage('dictionaryPokemon')
    cy.clearLocalStorage('myPokemonData')
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('/')
    cy.wait('@getListPokemon')
    cy.get(`[data-cy=pokemon-card-${1}]`).click()
    cy.wait('@getSinglePokemon');
    cy.get('[data-cy=pokemon-title-1]').contains('bulbasaur')
    cy.get('[data-cy=container-button-catcher-1]').should('be.visible')
    recursiveCatchPokemon();

    cy.visit('/my-pokemon');
    cy.get(`[data-cy=pokemon-card-${1}]`).contains("hahaha")
  })

})