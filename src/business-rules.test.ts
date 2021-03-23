import { BusinessRules } from "./business-rules";
import { Product } from "./product";
import { BusinessRule } from "./business-rule";

describe("BusinessRules", () => {
  it("applies a set of rules", () => {
    const product: Product = "product";
    const oneRule: BusinessRule = { condition: product, effect: "anEffect" };
    const otherRule: BusinessRule = { condition: product, effect: "otherEffect" };
    const businessRules = new BusinessRules(oneRule, otherRule);

    const effects = businessRules.run(product);

    expect(effects).toContain("anEffect");
    expect(effects).toContain("otherEffect");
  });

  it("does not apply rules to a product that does not satisfy the condition", () => {
    const product: Product = "product";
    const rule: BusinessRule = { condition: "otherProduct", effect: "anEffect" };
    const businessRules = new BusinessRules(rule);

    const effects = businessRules.run(product);

    expect(effects).not.toContain("anEffect");
  });
});
