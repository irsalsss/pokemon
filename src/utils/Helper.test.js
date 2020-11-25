import { urlToId, successfullLogic } from "./Helper";

describe("Test all helper function", () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  })

  test("function urlToId", () => {
    expect(urlToId("https://pokeapi.co/api/v2/pokemon/1/")).toBe("1")
    expect(urlToId("https://pokeapi.co/api/v2/pokemon/11/")).toBe("11")
    expect(urlToId("https://pokeapi.co/api/v2/pokemon/111/")).toBe("111")
    expect(urlToId("https://pokeapi.co/api/v2/pokemon/1111/")).toBe("1111")
  })


  test("function catch pokemon should success", () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(60);
    expect(successfullLogic()).toBe(true)
  })

  test("function catch pokemon should failed", () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(49);
    expect(successfullLogic()).toBe(true)
  })

})