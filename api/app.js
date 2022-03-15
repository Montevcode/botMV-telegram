const express = require('express');
const app = express();

const PORT = 3000;

const modoEntrega = require('./frases.json');

app.get('/modoEntrega/:type', (req, res) => {

    const type = req.params.type;
    
    if (!Object.keys(modoEntrega).includes(type)) {
        res.json("Not found");
    }

    const selectedmodoEntrega = modoEntrega[type];

    const index =  Math.ceil(Math.random() * ((selectedmodoEntrega.length - 1) - 0) + 0)

    res.json({
        'quote': selectedmodoEntrega[index]
    });

})

app.listen (PORT, ()=>{
    console.log("Escuchando en el puerto: " + PORT);
})