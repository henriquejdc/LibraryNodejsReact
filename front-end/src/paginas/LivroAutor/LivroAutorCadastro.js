import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function LivroAutorCadastro() {
    //Esta linha pega o Id da url em caso de edição
    const { id } = useParams();

    //Cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [idlivro, setLivro] = useState('');
    const [idautor, setAutor] = useState('');

    //Volta para a tela de livroautores
    const voltar = () => {
        navigate('/livroautores');
    }

    //Selecionar o registro no banco de dados para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/livroautor/${id}`);
        setLivro(data.idlivro);
        setAutor(data.idautor);
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
            "idlivro": idlivro,
            "idautor": idautor
        };
        await axios.post(`http://localhost:4000/livroautor`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "idlivro": idlivro,
            "idautor": idautor
        };
        await axios.put(`http://localhost:4000/livroautor/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/livroautor/${id}`);
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
            <h1>{(id) ? 'Alterar livro e autor' : 'Inserir livro e autor'}</h1>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cód. Livro</Form.Label>
                    <Form.Control type="number"
                        value={idlivro}
                        onChange={(e) => setLivro(e.target.value)} />
                    <Form.Label>Cód. Autor</Form.Label>
                    <Form.Control type="number"
                        value={idautor}
                        onChange={(e) => setAutor(e.target.value)} />
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