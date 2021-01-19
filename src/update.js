const Funcionario = require('./funcionario');
const parseBody = require('./parsebody');

exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    const funcionario = await Funcionario.find(id); 
    const { nome, idade, cargo } = parseBody(event.body);
    funcionario.nome = nome;
    funcionario.idade = Number(idade);
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
