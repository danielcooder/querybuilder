const express = require('express');
const autores = require('./controladores/autores');
const livros = require('./controladores/livros');

const rotas = express();

//autores
rotas.get('/autores');
rotas.get('/autores/:id');
rotas.post('/autores');
rotas.put('/autores/:id');
rotas.delete('autores/:id');

//livros
rotas.get('/livros');
rotas.get('/livros/:id');
rotas.post('/livros');
rotas.put('/livros/:id');
rotas.delete('livros/:id');

module.exports = rotas;