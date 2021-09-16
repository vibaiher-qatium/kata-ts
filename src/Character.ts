import { Damage } from "./Damage";

const DIED = 0;
const MAX_HEALTH = 1000;
const INITIAL_CONDITIONS = {
  health: 1000,
  level: 1
}
const DAMAGE_REDUCTION_MULTIPLIER = 0.5;
const HIGHER_RANK_THRESHOLD = 5;

export class Character {
  protected _health: number;
  protected _level: number;

  constructor() {
    const { health, level } = INITIAL_CONDITIONS;

    this._health = health;
    this._level = level;
  }

  public deal(damage: Damage, ...targets: Character[]): void {
    targets.forEach((target) => {
      if (this.isItself(target)) return;

      const modified = this.belongsToHigherRank(target)
        ? this.reduced(damage)
        : this.unmodified(damage);
      target.receive(modified)
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

  private receive(damage: Damage): void {
    if (damage > this.health()) return this.die();

    this._health -= damage;
  }

  private isDead(): boolean {
    return !this.isAlive();
  }

  private isItself(character: Character): boolean {
    return character === this;
  }

  private belongsToHigherRank(character: Character): boolean {
    return character.level() - this.level() >= HIGHER_RANK_THRESHOLD;
  }

  private reduced(damage: Damage): Damage {
    return damage - damage * DAMAGE_REDUCTION_MULTIPLIER;
  }

  private unmodified(damage: Damage): Damage {
    return damage;
  }

  private cure(quantity: number): void {
    this._health += quantity;
  }

  private restore(): void {
    this._health = MAX_HEALTH;
  }
}
