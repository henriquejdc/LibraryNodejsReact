import emprestimo from "../model/EmprestimoModel.js"

async function listar(req, res) {
    await emprestimo
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await emprestimo
        .findByPk(req.params.idemprestimo)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {

    if (!req.body.vencimento)
        res.status(500).send("Parametro vencimento é obrigatório.");

    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");

    if (!req.body.idpessoa)
        res.status(500).send("Parametro idpessoa é obrigatório.");

    // Define a data atual
    const dataAtual = new Date();

    await emprestimo
        .create({
            emprestimo: dataAtual, // Define a data atual
            vencimento: req.body.vencimento,
            devolucao: req.body.devolucao || null,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function alterar(req, res) {

    if (!req.body.vencimento)
        res.status(500).send("Parametro vencimento é obrigatório.");

    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");

    if (!req.body.idpessoa)
        res.status(500).send("Parametro idpessoa é obrigatório.");

    // Define a data atual
    const dataAtual = new Date();

    await emprestimo
        .update({
            emprestimo: dataAtual, // Define a data atual
            vencimento: req.body.vencimento,
            devolucao: req.body.devolucao || null,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa,
        },
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function excluir(req, res) {
    await emprestimo
        .destroy(
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir };