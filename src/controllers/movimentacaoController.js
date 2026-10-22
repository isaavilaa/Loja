const Movimentacao = require('../models/Movimentacao');
const Loja = require('../models/Loja');
 
async function cadastrar(req, res) {
  try {
    const { loja_id, tipo, quantidade } = req.body;
 
    const livro = await Loja.findByPk(loja_id);
    if (!loja) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado',
      });
    }
 
    if (tipo === 'saida' && loja.quantidade_estoque < quantidade) {
      return res.status(400).json({
        mensagem: 'Quantidade insuficiente em estoque',
      });
    }
 
    const novaQuantidade = tipo === 'entrada'
      ? loja.quantidade_estoque + quantidade
      : loja.quantidade_estoque - quantidade;
 
    await loja.update({ quantidade_estoque: novaQuantidade });
 
    const movimentacao = await Movimentacao.create({
      loja_id,
      tipo,
      quantidade,
      usuario_id: req.usuario.id, 
    });
 
    res.status(201).json(movimentacao);
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao cadastrar movimentação',
      erro: erro.message,
    });
}
}
 
module.exports = { cadastrar };


  
