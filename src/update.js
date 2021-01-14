const Funcionario = require('./funcionario');

function parseBody(query) {
  let buff = Buffer.from(query, "base64");
  let eventBodyStr = buff.toString('UTF-8');
  let eventBody = {};
  eventBodyStr.split('&').forEach( i => { let atr = i.split('='); eventBody[atr[0]]=atr[1] });
  return eventBody;
}

exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    const funcionario = await Funcionario.find(id); 
    const { nome, idade, cargo } = parseBody(event.body);
    funcionario.nome = nome;
    funcionario.idade = idade;
    funcionario.cargo = cargo;
    await funcionario.save();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/json; charset=utf-8',
      },
      body: funcionario.toString() 
    };
  } catch(e) {
    console.warn(e);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'text/json; charset=utf-8',
      },
      body: "Not found" 
    }
  }
}
