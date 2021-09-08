const INITIAL_HEALTH = 1000;
const INITIAL_LEVEL = 1;

const INITIAL_CONDITIONS = {
  health: 1000,
  level: 1,
  alive: true
}

export class Character {
  private _alive: boolean;
  private _health: number;
  private _level: number;

  constructor() {
    const { alive, health, level } = INITIAL_CONDITIONS;

    this._alive = alive;
    this._health = health;
    this._level = level;
  }

  public die(): void {
    this._alive = false;
  }

  public health(): number {
    return this._health;
  }

  public level(): number {
    return this._level;
  }

  public isAlive(): boolean {
    return this._alive;
  }
}