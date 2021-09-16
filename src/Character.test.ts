import { Character } from "./Character";

const INITIAL_HEALTH = 1000;
const MAX_HEALTH = 1000;

describe("A character", () => {
  it("borns healthy", () => {
    const character = new Character();

    expect(character.health()).toEqual(INITIAL_HEALTH);
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

  it("deals damage to other characters", () => {
    const damage = 5;
    const character = new Character();
    const someCharacters = [new Character(), new Character()];

    character.deal(damage, ...someCharacters);

    someCharacters.forEach((character) => {
      expect(character.health()).toBe(INITIAL_HEALTH - damage);
    })
  })

  it("kills other characters when damage exceeds health", () => {
    const character = new Character();
    const other = new Character();
    const damage = other.health() + 1;

    character.deal(damage, other);

    expect(other.health()).toEqual(0);
    expect(other.isAlive()).toBeFalsy();
  })

  it("kills other characters when damage is exactly the current health", () => {
    const character = new Character();
    const other = new Character();
    const damage = other.health();

    character.deal(damage, other);

    expect(other.health()).toEqual(0);
    expect(other.isAlive()).toBeFalsy();
  })

  it("heals to itself", () => {
    const damage = 50;
    const character = buildCharacterDamagedBy(damage);

    const quantity = 10;
    character.heal(quantity)

    const totalHealth = INITIAL_HEALTH - damage + quantity;
    expect(character.health()).toEqual(totalHealth);
  })

  it("cannot heal a healthy character", () => {
    const character = new Character();
    const inflatedHealth = MAX_HEALTH + 100;

    character.heal(inflatedHealth)

    expect(character.health()).toEqual(MAX_HEALTH);
  })

  it("cannot heal a dead character", () => {
    const character = new Character();
    character.die();

    character.heal(5)

    expect(character.health()).toEqual(0);
    expect(character.isAlive()).toBeFalsy();
  })

  it("cannot deal damage to itself", () => {
    const character = new Character();

    character.deal(50, character);

    expect(character.health()).toEqual(INITIAL_HEALTH);
  })

  const buildCharacterDamagedBy = (damage: number): Character => {
    const other = new Character();
    const character = new Character();
    other.deal(damage, character);

    return character;
  }
})