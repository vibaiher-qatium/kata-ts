const DIED = 0;
const INITIAL_CONDITIONS = {
  health: 1000,
  level: 1
}

export class Character {
  private _health: number;
  private _level: number;

  constructor() {
    const { health, level } = INITIAL_CONDITIONS;

    this._health = health;
    this._level = level;
  }

  public receive(damage: number): void {
    if (damage >= this.health())
      return this.die();

    this._health = this.health() - damage;
  }

  public die(): void {
    this._health = DIED;
  }

  public health(): number {
    return this._health;
  }

  public level(): number {
    return this._level;
  }

  public isAlive(): boolean {
    return this._health > DIED;
  }
}
