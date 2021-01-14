const get = require("./get");
const funcionario = {
  id: "123",
  nome: "value2",
  idade: 20,
  cargo: "value3"
};
describe("Testes criar funcionario", () => {
  test("deve criar um funcionario", async () => {
    const handler = get.handler;

    const response = await handler({ pathParameters:{id: funcionario.id}});

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
