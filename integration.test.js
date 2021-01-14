const axios = require('axios');
const endpoint = "https://xfpseyrb09.execute-api.us-east-1.amazonaws.com";
const funcionario = {
      id: '126',
      nome: 'teste',
      idade: '20',
      cargo: 'gerente'
};

describe("Testes de integracao da API", () => {
  test("Insere funcionario", async () => {
    const response = await axios.post(endpoint, funcionario);
    expect(response.data).toBe(funcionario);
  });
  test("Consulta funcionario", async () => {
    const response = await axios.get(`${endpoint}/${funcionario.id}`);
    expect(response.data).toBe(funcionario);
  });
  test.skip("Atualiza funcionario", async () => {
    const funcionario_atualizado = { cargo:"atualizado"};
    Object.assign(funcionario_atualizado, funcionario);
    const response = await axios.put(endpoint, funcionario_atualizado);
    expect(response).toBe(false);
  });
  test("Apaga funcionario", async () => {
    const response = await axios({
      method: 'delete',
      url: `${endpoint}/${funcionario.id}`
    });
    expect(response).toBe(false);
  });
});
