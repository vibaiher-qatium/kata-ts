import { Character } from "./Character";

describe("A character", () => {
  it("borns healthy", () => {
    const character = new Character();
    
    const initialHealth = 1000;
    expect(character.health()).toEqual(initialHealth);
  })

  it("borns newbie", () => {
    const character = new Character();
    
    const initialLevel = 1;
    expect(character.level()).toEqual(initialLevel);
  })

  it("borns alive", () => {
    const character = new Character();

    expect(character.isAlive()).toBeTruthy();
  })

  it("dies", () => {
    const character = new Character();

    character.die();

    expect(character.isAlive()).toBeFalsy()
  })
})