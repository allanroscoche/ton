const get = require("./update");
const querystring = require("querystring");
const funcionario = {
  id: "123",
  nome: "value2_updated",
  idade: 20,
  cargo: "value3"
};
describe("Testes atualizar funcionario", () => {
  test("deve atualizar com id valido", async () => {
    const handler = get.handler;

    const body = Buffer.from(querystring.encode(funcionario), 'utf-8').toString('base64');
    const params = { 
      pathParameters: { id: funcionario.id },
      body
    };
    const response = await handler(params);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
