const Funcionario = require('./funcionario');

exports.handler = async (event) => {
  const id = event.pathParameters.id
  try {
    await Funcionario.remove(id); 
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/json; charset=utf-8',
      }
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
