const handler = require("./delete");
const Funcionario = require("./funcionario");
jest.mock('./funcionario');
const funcionario = {
  id: "123",
  nome: "value2",
  idade: 20,
  cargo: "value3"
};

describe("Testes apagar funcionario", () => {
  test("deve apagar um funcionario", async () => {
    Funcionario.remove = jest.fn(() => { 
      let object = {};
      object.toString = () => JSON.stringify(funcionario);
      return object;
    });

    const response = await handler.handler({ pathParameters:{id: funcionario.id}});

    expect(Funcionario.remove).toBeCalled();
    expect(response.statusCode).toEqual(200);
  });
});
