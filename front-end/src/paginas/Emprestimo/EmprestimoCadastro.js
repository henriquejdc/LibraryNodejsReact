import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EmprestimoCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vencimento, setVencimento] = useState('');
    const [devolucao, setDevolucao] = useState('');
    const [idlivro, setIdLivro] = useState('');
    const [idpessoa, setIdPessoa] = useState('');
    const [erro, setErro] = useState(null); // Estado para armazenar mensagem de erro

    const voltar = () => {
        navigate('/emprestimos');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/emprestimo/${id}`);
            setVencimento(data.vencimento);
            setDevolucao(data.devolucao);
            setIdLivro(data.idlivro);
            setIdPessoa(data.idpessoa);
        } catch (error) {
            setErro('Erro ao carregar empréstimo');
        }
    }

    const salvar = async () => {
        try {
            if (id)
                await alterar();
            else
                await inserir();
        } catch (error) {
            setErro('Erro ao salvar empréstimo');
        }
    }

    const inserir = async () => {
        try {
            const json = {
                "vencimento": vencimento,
                "devolucao": devolucao,
                "idlivro": idlivro,
                "idpessoa": idpessoa,
            };
            await axios.post(`http://localhost:4000/emprestimo`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao inserir empréstimo');
        }
    }

    const alterar = async () => {
        try {
            const json = {
                "vencimento": vencimento,
                "devolucao": devolucao,
                "idlivro": idlivro,
                "idpessoa": idpessoa,
            };
            await axios.put(`http://localhost:4000/emprestimo/${id}`, json);
            voltar();
        } catch (error) {
            setErro('Erro ao alterar empréstimo');
        }
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/emprestimo/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir empréstimo');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, []);


    return (
        <>
            <h1>{(id) ? 'Alterar empréstimo' : 'Inserir empréstimo'}</h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Data da Devolução</Form.Label>
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

                {/* Exibindo mensagem de erro */}
                {erro && <p>{erro}</p>}

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
