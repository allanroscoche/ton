const get = require("./create");
const funcionario = {
  id: "123",
  nome: "value2",
  idade: 20,
  cargo: "value3"
};
describe("Testes consultar funcionario", () => {
  test("deve consultar com id valido", async () => {
    const handler = get.handler;

    const response = await handler(funcionario);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
