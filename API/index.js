const express = require('express');

let t = 0
let u = 0
const server = express();

server.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.get('/', (req, res) => {
  return res.send(`
  <p>Insira 
  <span style="color: red">/data</span> 
  com o método <span style="color: green">GET</span> receber os dados e com o método <span style="color: green">PUT</span> para inserir dados.
  <br/><br/>
  Os dados viram no formato .json
  <br/><br/>
  Use: <span style="color: purple">?t="número"</span> para enviar a temperatura.<br/>
  Use: <span style="color: purple">?u="número"</span> para enviar a umidade.
  <br/><br/>
  Use: <span style="color: purple">?t="número"&u="número"</span> para enviar os dois dados ao mesmo tempo.
  <br/><br/>
  Caso não use parâmetros no método <span style="color: green">PUT</span> a API irá retornar o erro <span style="color: red">500</span>.
  </p>`)
})

server.get('/data', (req, res) => {
  return res.json({ 'temp': `${t}`, 'umid': `${u}` })
})

server.post('/data', (req, res) => {
  const temperatura = req.query.t;
  const umidade = req.query.u;
  if (temperatura) {
    t = temperatura
  }
  if (umidade) {
    u = umidade
  }
  if (!temperatura && !umidade) {
    throw new Error("No data sent!")
  }
  return res.send()
})

server.listen(3030)