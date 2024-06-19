const conexao = require('../conexao');

const listarAutores = async (req, res) => {
    const livros = await conexao.query('select * from livros');
    res.json(livros);
}

const obterAutor = async (req, res) => {

}

const cadastrarAutor = async (req, res) => {

}

const atualizarAutor = async (req, res) => {

}

const excluirAutor = async (req, res) => {

}

module.exports = {

    listarAutores,
    obterAutor,
    cadastrarAutor,
    atualizarAutor,
    excluirAutor

}