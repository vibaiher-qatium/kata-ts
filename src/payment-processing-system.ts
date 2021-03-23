import { Product } from "./product";

type Effects = string[];

type Operation = {
  product: Product;
  effects: Effects;
};

export class PaymentProcessingSystem {
  public static process(product: Product): Operation {
    if (this.isBook(product)) {
      return this.buildOperationWith(product, [
        ...this.physicalEffects(),
        ...this.bookEffects(),
      ]);
    }

    if (this.isMembership(product)) {
      return this.buildOperationWith(product, this.membershipEffects());
    }

    if (this.isPhysical(product)) {
      return this.buildOperationWith(product, this.physicalEffects());
    }

    return this.buildOperationWith(product, this.noEffects);
  }

  private static noEffects: Effects = [];

  private static buildOperationWith(
    product: Product,
    effects: Effects = []
  ): Operation {
    return { product, effects };
  }

  private static isPhysical(product: string): boolean {
    return product == "physicalProduct";
  }

  private static physicalEffects(): Effects {
    return ["shippingPackingSlip"];
  }

  private static isBook(product: string): boolean {
    return product == "book";
  }

  private static bookEffects(): Effects {
    return ["royaltiesPackingSlip"];
  }

  private static isMembership(product: string): boolean {
    return product == "membership";
  }

  private static membershipEffects(): Effects {
    return ["activatedMembership"];
  }
}
