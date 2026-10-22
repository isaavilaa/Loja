const express = require('express');
const router = express.Router();
const { cadastrar, listar } = require('../controllers/lojaController');
const auth = require('../middlewares/auth');
const permitir = require('../middlewares/checkRole'); 
 
router.post('/loja', auth, cadastrar);
router.get('/loja', auth, listar);
router.delete('/livros/:id', auth, permitir('administrador'), deletar); 

module.exports = router;
 
