import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AutorCadastro() {
    //Esta linha pega o Id da url em caso de edição
    const { id } = useParams();

    //Cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [autor, setAutor] = useState('');

    //Volta para a tela de autores
    const voltar = () => {
        navigate('/autores');
    }

    //Selecionar o registro no banco de dados para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/autor/${id}`);
        setAutor(data.autor);
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
            "autor": autor
        };
        await axios.post(`http://localhost:4000/autor`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "autor": autor
        };
        await axios.put(`http://localhost:4000/autor/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/autor/${id}`);
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
            <h1>{(id) ? 'Alterar autor' : 'Inserir autor'}</h1>

            <h2>{autor}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome do autor</Form.Label>
                    <Form.Control type="text"
                        value={autor}
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