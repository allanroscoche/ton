const get = require("./create");
const querystring = require("querystring");
const Funcionario = require("./funcionario");
const funcionario = {
  id: "123",
  nome: "value2",
  idade: 20,
  cargo: "value3"
};

jest.mock('./funcionario', () => {
  return jest.fn().mockImplementation(() => {
    return { 
      toString: () => JSON.stringify(funcionario),
      save: () => Promise.resolve()
    };
  })
});

describe("Testes Criar funcionario", () => {
  test("deve criar com id valido", async () => {
    const handler = get.handler;
    const body = Buffer.from(querystring.encode(funcionario), 'utf-8').toString('base64');

    const response = await handler({ body});

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
