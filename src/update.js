const Funcionario = require('./funcionario');

exports.handler = async (event) => {
  const id = event.pathParameters.id
  const { nome, idade, cargo } = event;
  try {
    const funcionario = await Funcionario.find(id); 
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
