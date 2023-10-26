const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

let produtos = [
  { id: 1, desc: "cafe", quantidade: 7, valor: 10 },
  { id: 2, desc: "leite", quantidade: 4, valor: 5 },
  
];

app.get("/produtos", (req, res) => {
  console.log("get");
  res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((produto) => produto.id === id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.post("/produtos", (req, res) => {
  const newproduto = req.body;
  produtos.push(newproduto);
  res.status(201).json(newproduto);
});

app.put("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedproduto = req.body;
  const index = produtos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...updatedproduto };
    res.json(produtos[index]);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    const removedproduto = produtos.splice(index, 1);
    res.json(removedproduto[0]);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
