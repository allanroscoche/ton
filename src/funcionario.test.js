const AWS = require('aws-sdk');
const Funcionario = require("./funcionario");
const funcionario = {
  id: 123,
  nome: "nome",
  cargo: "cargo",
  idade: 20
};
const mockDelete = jest.fn();
const mockUpdate = jest.fn();
jest.mock('aws-sdk', () => {
  return {
    config: { update: jest.fn() },
    DynamoDB: jest.fn().mockImplementation( () => {
      return {
        putItem: () => {
          return {
            promise: mockUpdate
          }
        },
        deleteItem: () => {
          return {
            promise: mockDelete 
          }
        },
        getItem: () => {
          return {
            promise: jest.fn().mockResolvedValue({
              Item: {
                id: { "N" : funcionario.id.toString()},
                nome: { "S" : funcionario.nome},
                cargo: { "S" : funcionario.cargo},
                idade: { "N" : funcionario.idade.toString()}
              }
            })
          }
        }
      };
    })
  };
});

describe("Should test Funcionario Class", () => {
  test("Should find funcionario", async () => {
    const func = await Funcionario.find("123");

    expect(func).toEqual(funcionario);
  });

  test("Should update funcionario", async () => {
    const func = await Funcionario.find("123");
    func.idade = 12;
    await func.save();

    expect(mockUpdate).toHaveBeenCalled();
  });
 
  test("Should remove funcionario", async () => {
    await Funcionario.remove("123");

    expect(mockDelete).toHaveBeenCalled();
  });

});
