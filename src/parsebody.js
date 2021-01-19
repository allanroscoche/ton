module.exports = function parseBody(query) {
  let buff = Buffer.from(query, "base64");
  let eventBodyStr = buff.toString('UTF-8');
  let eventBody = {};
  eventBodyStr.split('&').forEach( i => { let atr = i.split('='); eventBody[atr[0]]=atr[1] });
  return eventBody;
}
