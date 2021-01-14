const get = require("./update");
const funcionario = {
  id: "123",
  nome: "value2_updated",
  idade: 20,
  cargo: "value3"
};
describe("Testes consultar funcionario", () => {
  test("deve consultar com id valido", async () => {
    const handler = get.handler;

    const params = { pathParameters: { id: funcionario.id }};
    Object.assign(params, funcionario);
    const response = await handler(params);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
