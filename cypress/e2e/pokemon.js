import "cypress-localstorage-commands";
import ListPokemon from '../fixtures/listPokemon.json';
const pokemonResult = ListPokemon.results;

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

const dictionaryPokemon = {
  "bulbasaur": 1,
  "venusaur": 3,
  "charmander": 2,
  "charmeleon": 1,
  "charizard": 1,
  "squirtle": 4,
  "wartortle": 3,
  "blastoise": 3,
  "metapod": 2
}

const myPokemonData = [
  {"name": "bulbasaur", "username": "hehe", "id": 1},
  {"name": "venusaur", "username": "haha", "id": 3},
  {"name": "venusaur", "username": "hihi", "id": 3},
  {"name": "venusaur", "username": "huhu", "id": 3},
  {"name": "charmander", "username": "a", "id": 4},
  {"name": "charmander", "username": "b", "id": 4},
  {"name": "charmeleon", "username": "c", "id": 5},
  {"name": "charizard", "username": "d", "id": 6},
  {"name": "squirtle", "username": "e", "id": 7},
  {"name": "squirtle", "username": "f", "id": 7},
  {"name": "squirtle", "username": "g", "id": 7},
  {"name": "squirtle", "username": "h", "id": 7},
  {"name": "wartortle", "username": "i", "id": 8},
  {"name": "wartortle", "username": "j", "id": 8},
  {"name": "wartortle", "username": "k", "id": 8},
  {"name": "blastoise", "username": "l", "id": 9},
  {"name": "blastoise", "username": "m", "id": 9},
  {"name": "blastoise", "username": "n", "id": 9},
  {"name": "metapod", "username": "o", "id": 11},
  {"name": "metapod", "username": "p", "id": 11}
]

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
    for (let i = 1; i <= pokemonResult.length; i++){
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
    cy.get(`[data-cy=pokemon-card-1]`).click()
    cy.wait('@getSinglePokemon');
    cy.get('[data-cy="title-page"]').should('contain', 'bulbasaur')
    cy.get('[data-cy="container-button-catcher-1"]').should('be.visible')
    recursiveCatchPokemon();

    cy.visit('/my-pokemon');
    cy.get(`[data-cy=pokemon-card-hahaha]`).should('contain', 'hahaha')

    cy.get("[data-cy='total-my-pokemon']").should('contain', '(Total Owned: 1)')
  })

  it("should remove pokemon", () => {
    cy.setLocalStorage("dictionaryPokemon", JSON.stringify(dictionaryPokemon));
    cy.setLocalStorage("myPokemonData", JSON.stringify(myPokemonData));

    cy.visit('/my-pokemon')
    cy.get("[data-cy='total-my-pokemon']").should('contain', '(Total Owned: 20)')

    cy.get("[data-cy='remove-card-button-h']").click();
    cy.get("[data-cy='pokemon-card-button-h']").should('not.be.visible')
    cy.get("[data-cy='total-my-pokemon']").should('contain', '(Total Owned: 19)')
  })

  it("should render the owned of each pokemon correctly", () => {
    cy.setLocalStorage("dictionaryPokemon", JSON.stringify(dictionaryPokemon));
    cy.setLocalStorage("myPokemonData", JSON.stringify(myPokemonData));

    cy.visit('/')
    cy.get("[data-cy='total-my-pokemon']").should('contain', '(Total Owned: 20)')

    for (let i = 1; i <= pokemonResult.length; i++){
      cy.get(`[data-cy="pokemon-id-${i}"]`).should('contain', `Pokemon ID: ${i}`)
      cy.get(`[data-cy="total-owned-${i}"]`).should('contain', `Owned: ${dictionaryPokemon[pokemonResult[i - 1]?.name] || 0}`)
      cy.get('[data-cy="container-home-page"]').scrollTo(0, i * 15)
    }
  })
})