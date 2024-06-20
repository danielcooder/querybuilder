const conexao = require('../conexao');

const listarAutores = async (req, res) => {
    try {
        const { rows: autores } = await conexao.query('select * from autores');

        return res.status(200).json(autores);
    } catch (erro) {
        return res.status(400).json(error.message);
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
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const cadastrarAutor = async (req, res) => {

    const { nome, idade } = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.")
    }

    try {

        const query = 'insert into autores (nome, idade) values ($1, $2)';

        const autor = await conexao.query(query, [nome, idade]);
        if (autor.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o autor');
        }

        return res.status(200).json('Autor cadastrado com sucesso!')

    } catch (error) {
        return res.status(400).json(error.message);
    }


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