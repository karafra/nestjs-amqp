import { AmqpModule, AMQP_CLIENT } from "./main";

describe("main exports", () => {
  it("is defined", () => {
    expect(AmqpModule).toBeDefined();
    expect(AMQP_CLIENT).toBeDefined();
  });
});
