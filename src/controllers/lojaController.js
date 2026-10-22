const Loja = require('../models/Loja');
const { Op } = require('sequelize'); 
 
async function cadastrar(req, res) {
  try {
    const { titulo, autor, quantidade_estoque } = req.body;
 
    const loja = await Loja.create({
      titulo,
      autor,
      quantidade_estoque,
    });
 
    res.status(201).json(loja);
  } catch (erro) {
    res.status(400).json({
      mensagem: 'Erro ao cadastrar produto',
      erro: erro.message,
    });
  }
}
 
async function listar(req, res) { 
    try { 
    const { pagina = 1, limite = 10, nome, data } = req.query; 
    const filtro = {}; 
    // guarda as condições da busca em filtro  
    if (nome) { 
    filtro.titulo = { [Op.like]: `%${nome}%` }; 
    } 
    if (data) { 
    filtro.createdAt = { [Op.gte]: new Date(data) }; 
    } 
    const livros = await Livro.findAll({ 
    where: filtro, 
    limit: Number(limite), 
    offset: (Number(pagina) - 1) * Number(limite), 
    }); 
    res.json(livros); 
    } catch (erro) { 
    res.status(400).json({ 
    mensagem: 'Erro ao listar livros', 
    erro: erro.message, 
    }); 
    } 
    }
 
module.exports = { cadastrar, listar };

async function deletar(req, res) { 
    try { 
      const { id } = req.params; 
    
      const loja = await Loja.findByPk(id); 
      if (!loja) { 
        return res.status(404).json({ 
          mensagem: 'Loja não encontrado', 
        }); 
      } 
    
      await loja.destroy(); 
    
      res.status(200).json({ 
        mensagem: 'Loja removido com sucesso', 
      }); 
    } catch (erro) { 
      res.status(400).json({ 
        mensagem: 'Erro ao remover loja', 
        erro: erro.message, 
      }); 
    } 
  } 
    
  module.exports = { cadastrar, listar, deletar }; 
