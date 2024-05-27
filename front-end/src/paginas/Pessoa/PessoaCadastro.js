import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PessoaCadastro() {
    //Esta linha pega o Id da url em caso de edição
    const { id } = useParams();

    //Cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [pessoa, setPessoa] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    //Volta para a tela de pessoas
    const voltar = () => {
        navigate('/pessoas');
    }

    //Selecionar o registro no banco de dados para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/pessoa/${id}`);
        setPessoa(data.pessoa);
        setEmail(data.email);
        setTelefone(data.telefone);
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
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.post(`http://localhost:4000/pessoa`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "pessoa": pessoa,
            "email": email,
            "telefone": telefone
        };
        await axios.put(`http://localhost:4000/pessoa/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/pessoa/${id}`);
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
            <h1>{(id) ? 'Alterar pessoa' : 'Inserir pessoa'}</h1>

            <h2>{pessoa}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome do pessoa</Form.Label>
                    <Form.Control type="text"
                        value={pessoa}
                        onChange={(e) => setPessoa(e.target.value)} />
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)} />
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