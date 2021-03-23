import { Payment } from "./payment"
import { Product } from "./product"

describe("Payment", () => {
  it("is for a product", () => {
    const product: Product = "book"

    const payment = Payment.for(product)

    expect(payment).toEqual(product)
  })
})