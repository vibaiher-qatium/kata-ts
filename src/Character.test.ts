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

  it("kills other characters when received damage exceeds current health", () => {
    const character = new Character();
    const other = new Character();
    const damage = other.health() + 1;

    character.deal(damage, other);

    expect(other.health()).toEqual(0);
    expect(other.isAlive()).toBeFalsy();
  })

  it("kills other characters when received damage is exactly the current health", () => {
    const character = new Character();
    const other = new Character();
    const damage = other.health();

    character.deal(damage, other);

    expect(other.health()).toEqual(0);
    expect(other.isAlive()).toBeFalsy();
  })

  it("recovers health", () => {
    const damage = 5;
    const character = buildCharacterDamagedBy(damage);

    const health = 5;
    character.recover(health)

    const totalHealth = INITIAL_HEALTH - damage + health;
    expect(character.health()).toEqual(totalHealth);
  })

  it("cannot recover health above maximum", () => {
    const character = new Character();
    const inflatedHealth = MAX_HEALTH + 100;

    character.recover(inflatedHealth)

    expect(character.health()).toEqual(MAX_HEALTH);
  })

  it("cannot recover health after death", () => {
    const character = new Character();
    character.die();

    character.recover(5)

    expect(character.health()).toEqual(0);
    expect(character.isAlive()).toBeFalsy();
  })

  const buildCharacterDamagedBy = (damage: number): Character => {
    const other = new Character();
    const character = new Character();
    other.deal(damage, character);

    return character;
  }
})