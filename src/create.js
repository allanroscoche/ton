const Funcionario = require("./funcionario");
const parseBody = require("./parsebody");

function parseBody2(query) {
  let buff = Buffer.from(query, "base64");
  let eventBodyStr = buff.toString('UTF-8');
  let eventBody = {};
  eventBodyStr.split('&').forEach( i => { let atr = i.split('='); eventBody[atr[0]]=atr[1] });
  return eventBody;
}

exports.handler = async (event) => {
  const { id, nome, idade, cargo } = parseBody(event.body);
  let funcionario = new Funcionario(id);
  
  funcionario.nome = nome;
  funcionario.idade = Number(idade);
  funcionario.cargo = cargo;
  await funcionario.save();

    return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/json; charset=utf-8',
    },
    body: funcionario.toString(),
    };
}
