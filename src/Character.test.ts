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

  it("receives damage", () => {
    const damage = 5;
    const character = new Character();
    const previousHealth = character.health();

    character.receive(damage);

    const lessHealthy = previousHealth - damage;
    expect(character.health()).toBe(lessHealthy);
  })

  it("dies when received damage exceeds current health", () => {
    const character = new Character();
    const damage = character.health() + 1;

    character.receive(damage);

    expect(character.health()).toEqual(0);
    expect(character.isAlive()).toBeFalsy();
  })

  it("dies when received damage is exactly the current health", () => {
    const character = new Character();
    const damage = character.health();

    character.receive(damage);

    expect(character.health()).toEqual(0);
    expect(character.isAlive()).toBeFalsy();
  })
})