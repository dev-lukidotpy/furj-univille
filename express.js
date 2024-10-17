const express = require('express');
const app = express();
const port = 3000;
 
app.use(express.json());

let items = [
    {id: 1, name: "Engenharia de Software"},
    {id: 2, name: "Sistemas de Informação"},
];

app.get('/item/count'), (req, res) => {
    const length = items.length;
    res.status(200).json({"Count": length});
}

app.get('/item', (req, res) => {
    res.status(200).json(items);
});

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({"Message": "Item não encontrado"});
    }
})

app.post('/item', (req, res) => {
    const newItem = {id: items.length + 1, ...req.body};
    const {name} = req.body;
    if (!name) {
        res.status(400).json({"Message": "Name precisa existir"});
    } else if (name.length < 3) {
        res.status(400).json({"Message": "Name precisa ter 3 ou mais caracteres"});
    } else if (typeof name !== "string") {
        res.status(400).json({"Message": "Name precisa ser string"});
    } else {
        items.push(newItem);
        res.status(201).json(newItem);
    }
});

app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido!"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

app.put('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = {id, ...req.body};
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }

});

app.patch('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    const {name} = req.body;
    if (index !== -1) {
        items[index].name = name;
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }
})

app.delete('/item', (req, res) => {
    items = [];
    res.status(200).json({"Message": "Todos os itens removidos"});
})

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})