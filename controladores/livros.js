const conexao = require('../conexao');

const listarLivros = async (req, res) => {
    try {

        const query = `
      SELECT l.id, a.nome AS nome_autor, l.nome, l.genero, l.editora, l.data_publicacao 
      FROM livros l
      LEFT JOIN autores a ON l.autor_id = a.id `;

        const { rows: livros } = await conexao.query('select * from livros');

        return res.status(200).json(livros);
    } catch (erro) {
        return res.status(400).json(erro.message);
    }
}

const obterLivros = async (req, res) => {


    const { id } = req.params;

    try {
        const livro = await conexao.query('select * from livros where id = $1', [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado')
        }

        return res.status(200).json(livro.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarLivros = async (req, res) => {
    const { autor_id, nome, genero, editora, data_publicacao } = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.")
    }
    try {

        const query = 'insert into livros (autor_id, nome, genero, editora, data_publicacao) values ($1, $2, $3, $4, $5)';

        const livro = await conexao.query(query, [autor_id, nome, genero, editora, data_publicacao]);

        if (livro.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o livro');
        }

        return res.status(200).json('Livro cadastrado com sucesso!')

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarLivros = async (req, res) => {

    const { id } = req.params;
    const { autor_id, nome, genero, editora, data_publicacao } = req.body;

    try {
        const livro = await conexao.query('select * from livros where id = $1', [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado.')
        }

        const query = `update livros set 
        autor_id = $1, 
        nome = $2, 
        genero = $3, 
        editora = $4,
        data_publicacao = $5
        where id = $6`;

        const livroAtualizado = await conexao.query(query, [autor_id, nome, genero, editora, data_publicacao, id]);

        if (livroAtualizado.rowCount === 0) {
            return res.status(404).json('Não foi possivel atualizar o livro')
        }

        return res.status(200).json('O livro foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const excluirLivros = async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await conexao.query('select * from livros where id = $1', [id]);

        if (livro.rowCount === 0) {
            return res.status(404).json('Livro não encontrado.')
        }

        const query = 'delete from livros where id = $1';
        const livroExcluido = await conexao.query(query, [id]);

        if (livroExcluido.rowCount === 0) {
            return res.status(404).json('Não foi possivel excluir o livro')
        }

        return res.status(200).json('Livro foi excluido com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {

    listarLivros,
    obterLivros,
    cadastrarLivros,
    atualizarLivros,
    excluirLivros

}