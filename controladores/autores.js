const conexao = require('../conexao');

const listarAutores = async (req, res) => {
    try {
        const { rows: autores } = await conexao.query('select * from autores');

        return res.status(200).json(autores);
    } catch (erro) {
        return res.status(400).json(erro.message);
    }
}

const obterAutor = async (req, res) => {
    const { id } = req.params;

    try {
        const autor = await conexao.query('select * from autores  where id = $1', [id]);

        if (autor.rowCount === 0) {
            return res.status(404).json('Autor não encontrado')

        }

        return res.status(200).json(autor.rows[0]);
    } catch (erro) {
        return res.status(400).json(erro.message);
    }

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