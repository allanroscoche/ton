const fetch = require('node-fetch');
const querystring = require('querystring');
const fs = require('fs');

const endpoint = fs.readFileSync("endpoint.txt").toString().split('\n')[0];
const funcionario = {
      id: '126',
      nome: 'teste',
      idade: 22,
      cargo: 'gerente'
};
const url = `${endpoint}/${funcionario.id}`
describe("Testes de integracao da API", () => {
  test("Insere funcionario", async () => {
    const data = querystring.stringify(funcionario);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: data,
    });
    const json = await response.json();
    expect(json).toStrictEqual(funcionario);
  });
  test("Consulta funcionario", async () => {
    const response = await fetch(url);

    const json = await response.json();
    expect(json).toStrictEqual(funcionario);
  });
  test("Atualiza funcionario", async () => {
    const funcionario_atualizado = { cargo:"atualizado"};
    Object.assign(funcionario_atualizado, funcionario);
    const data = querystring.stringify(funcionario);

    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: data,
    });

    const json = await response.json();
    expect(json).toStrictEqual(funcionario_atualizado);
  });
  test("Apaga funcionario", async () => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 
        'Content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      url: `${endpoint}/${funcionario.id}`
    });
    expect(response.status).toBe(200);
  });
});
