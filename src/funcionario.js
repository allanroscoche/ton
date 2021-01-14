const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

module.exports = class Funcionario {
  constructor(id) {
    this.id = id;
    this.nome= "";
    this.idade = 0;
    this.cargo = "";
  }

  load_atr(atr) {
    const value = Object.values(atr)[0];
    if(Object.keys(atr)[0] == 'N')
      return Number(value);
    return value;
  }

  build_item() {
    return {
      TableName: 'ton-db',
      Item: {
        id: { S: this.id },
        nome: { S: this.nome },
        idade: { N: this.idade.toString() },
        cargo: { S: this.cargo }
      }
    };
  }

  static build_key(id) {
    return {
      TableName: 'ton-db',
      Key: {
        id: { S: id }
      }
    };
  }

  async save() {
    const params = this.build_item();
    await ddb.putItem(params).promise();
  }

  static async remove(id) {
    const params = this.build_key(id);
    await ddb.deleteItem(params).promise();
  }

  static async find(id) {
    const params = this.build_key(id);
    const data = await ddb.getItem(params).promise();
    const funcionario = new Funcionario();
    funcionario.load_from_db(data);
    return funcionario;
  }
  load_from_db(data) {
    const items = Object.entries(data.Item);
    items.forEach( item => {
      this[item[0]] = this.load_atr(item[1]);
    });
  }
  toString() {
    return JSON.stringify({
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      cargo: this.cargo
    });
  }
}
