const express = require('express');

let t = 0
const server = express();

server.get('/temp', (req, res) => {
    const temperatura = req.query.q;
    if (temperatura){
        t = temperatura
        return res.json({'temp': `${temperatura}`})
    }
    console.log(t);
    return res.json({'temp': `${t}`})
    
})

server.listen(3030)
