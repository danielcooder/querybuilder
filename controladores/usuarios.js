const conexao = require("../conexao")

const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json("O campo nome é obrigatório.")
    }

    if (!email) {
        return res.status(400).json("O campo nome é obrigatório.")
    }

    if (!senha) {
        return res.status(400).json("O campo nome é obrigatório.")
    }

    try {

        const query = 'select * from usuarios where email = $1';
        const usuarios = await conexao.query(query, [email]);

        if (usuarios.rowCount > 0) {

            return res.status(400).json("Este email já foi cadastrado.")
        }

    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {

        const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
        const usuarios = await conexao.query(query, [nome, email, senha]);

        if (usuarios.rowCount === 0) {
            return res.status(400).json('Não foi possivel cadastrar o usuario');
        }

        return res.status(200).json('Usuario cadastrado com sucesso!')

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = { cadastrarUsuario };