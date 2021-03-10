import { wadus } from "./index"

describe("Wadus", () => {
  it("returns 'wadus'", () => {
    const expected = "wadus";

    const result = wadus();

    expect(result).toEqual(expected);
  })
})
