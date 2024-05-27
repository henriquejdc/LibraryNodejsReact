import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EmprestimoCadastro() {
    //Esta linha pega o Id da url em caso de edição
    const { id } = useParams();

    //Cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [vencimento, setVencimento] = useState('');
    const [devolucao, setDevolucao] = useState('');
    const [idlivro, setIdLivro] = useState('');
    const [idpessoa, setIdPessoa] = useState('');

    //Volta para a tela de emprestimos
    const voltar = () => {
        navigate('/emprestimos');
    }

    //Selecionar o registro no banco de dados para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/emprestimo/${id}`);
        setVencimento(data.vencimento);
        setDevolucao(data.devolucao);
        setIdLivro(data.idlivro);
        setIdPessoa(data.idpessoa);
    }

    //Método que verifica qual ação deve ser executada
    const salvar = () => {
        if (id)
            alterar();
        else
            inserir();
    }

    const inserir = async () => {
        const json = {
            "vencimento": vencimento,
            "devolucao": devolucao,
            "idlivro": idlivro,
            "idpessoa": idpessoa,
        };
        await axios.post(`http://localhost:4000/emprestimo`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "vencimento": vencimento,
            "devolucao": devolucao,
            "idlivro": idlivro,
            "idpessoa": idpessoa,
        };
        await axios.put(`http://localhost:4000/emprestimo/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/emprestimo/${id}`);
            voltar();
        }
    }

    //Inicia a tela buscando o registro em caso de edição
    useEffect(() => {
        if (id)
            selecionar();
    }, []);


    return (
        <>
            <h1>{(id) ? 'Alterar emprestimo' : 'Inserir emprestimo'}</h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Data do Devolução</Form.Label>
                    <Form.Control type="date"
                        value={devolucao}
                        onChange={(e) => setDevolucao(e.target.value)} />
                    <Form.Label>Data do Vencimento</Form.Label>
                    <Form.Control type="date"
                        value={vencimento}
                        onChange={(e) => setVencimento(e.target.value)} />
                    <Form.Label>Cód. Livro</Form.Label>
                    <Form.Control type="number"
                        value={idlivro}
                        onChange={(e) => setIdLivro(e.target.value)} />
                    <Form.Label>Cód. Pessoa</Form.Label>
                    <Form.Control type="number"
                        value={idpessoa}
                        onChange={(e) => setIdPessoa(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button"
                    onClick={() => salvar()}>
                    Salvar
                </Button>

                <Button variant="secondary" type="button"
                    onClick={() => voltar()}>
                    Cancelar
                </Button>

                <Button variant="danger" type="button" hidden={!id}
                    onClick={() => excluir()}>
                    Excluir
                </Button>
            </Form>
        </>

    );
}