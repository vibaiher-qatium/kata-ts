import { PaymentProcessingSystem } from "./payment-processing-system";
import { Payment } from "./payment";

describe("Business Rules", () => {
  it("generates shipping packing slip when payment is for a physical product", () => {
    const payment = Payment.for("physicalProduct");

    const operation = PaymentProcessingSystem.process(payment);

    expect(operation.effects).toContain("shippingPackingSlip");
  });

  it("generates a duplicated packing slip for royalties deparment when payment is for a book", () => {
    const payment = Payment.for("book");

    const operation = PaymentProcessingSystem.process(payment);

    expect(operation.effects).toContain("shippingPackingSlip")
    expect(operation.effects).toContain("royaltiesPackingSlip")
  });

  it("activates membership when payment is for a membership", () => {
    const payment = Payment.for("membership");

    const operation = PaymentProcessingSystem.process(payment);

    expect(operation.effects).toContain("activatedMembership");
  });
});
