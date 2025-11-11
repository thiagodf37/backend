let produtos = [];
let nextId = 1;

exports.listarProdutos = (req, res) => {
  res.status(200).json(produtos);
};

exports.criarProduto = (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined || preco === null) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }
  const produto = { id: String(nextId++), nome: String(nome), preco: Number(preco) };
  produtos.push(produto);
  res.status(201).json(produto);
};

exports.obterProduto = (req, res) => {
  const id = String(req.params.produtoId);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.status(200).json(produto);
};

exports.atualizarProduto = (req, res) => {
  const id = String(req.params.produtoId);
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });

  const { nome, preco } = req.body;
  if (!nome || preco === undefined || preco === null) {
    return res.status(422).json({ message: 'Nome e preço são obrigatórios' });
  }

  const atualizado = { id, nome: String(nome), preco: Number(preco) };
  produtos[idx] = atualizado;
  res.status(200).json(atualizado);
};

exports.removerProduto = (req, res) => {
  const id = String(req.params.produtoId);
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado' });
  produtos.splice(idx, 1);
  res.status(204).send();
};