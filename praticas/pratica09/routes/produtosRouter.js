const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtosController');

router.get('/', controller.listarProdutos);
router.post('/', controller.criarProduto);
router.get('/:produtoId', controller.obterProduto);
router.put('/:produtoId', controller.atualizarProduto);
router.delete('/:produtoId', controller.removerProduto);

module.exports = router;