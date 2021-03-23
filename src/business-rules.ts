import { Product } from "./product";
import { BusinessRule } from "./business-rule";

export class BusinessRules {
  private rules;

  constructor(...rules: BusinessRule[]) {
    this.rules = rules;
  }

  public run(product: Product): string[] {
    const satisfied = this.rules.filter((rule) => product === rule.condition);
    return satisfied.map((rule) => rule.effect)
  }
}
