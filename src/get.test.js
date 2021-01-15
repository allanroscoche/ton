const get = require("./get");
const Funcionario = require("./funcionario");
jest.mock('./funcionario');
const funcionario = {
  id: "123",
  nome: "value2",
  idade: 20,
  cargo: "value3"
};

describe("Testes consultar uncionario", () => {
  test("deve consultar um funcionario", async () => {
    const handler = get.handler;
    Funcionario.find = jest.fn(() => { 
      let object = {};
      object.toString = () => JSON.stringify(funcionario);
      return object;
    });

    const response = await handler({ pathParameters:{id: funcionario.id}});

    expect(Funcionario.find).toBeCalled();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(funcionario));
  });
});
