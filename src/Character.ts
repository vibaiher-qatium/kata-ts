const DIED = 0;
const MAX_HEALTH = 1000;
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

  public deal(damage: number, ...targets: Character[]): void {
    const itself = this;
  
    targets.forEach((target) => {
      if (target == itself) return;

      target.receive(damage)
    });
  }

  public heal(quantity: number): void {
    if (this.isDead()) return;
    if (this.health() + quantity >= MAX_HEALTH) return this.restore();

    this.cure(quantity);
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
    return this.health() > DIED;
  }

  private receive(damage: number): void {
    if (damage > this.health()) return this.die();

    this._health -= damage;
  }

  private isDead(): boolean {
    return !this.isAlive();
  }

  private cure(quantity: number): void {
    this._health += quantity;
  }

  private restore(): void {
    this._health = MAX_HEALTH;
  }
}
