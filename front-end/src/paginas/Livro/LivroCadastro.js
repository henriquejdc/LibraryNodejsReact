import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function LivroCadastro() {
    //Esta linha pega o Id da url em caso de edição
    const { id } = useParams();

    //Cria um navegador para executar links
    const navigate = useNavigate();

    //Declarar uma variável useState para cada campo da tabela
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [edicao, setEdicao] = useState('');
    const [resumo, setResumo] = useState('');
    const [emprestado, setEmprestado] = useState(false);
    const [idcategoria, setIdCategoria] = useState('');
    const [ideditora, setIdEditora] = useState('');

    //Volta para a tela de livros
    const voltar = () => {
        navigate('/livros');
    }

    //Selecionar o registro no banco de dados para editação
    const selecionar = async () => {
        const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
        setTitulo(data.titulo);
        setAno(data.ano);
        setPaginas(data.paginas);
        setEdicao(data.edicao);
        setResumo(data.resumo);
        setEmprestado(data.emprestado);
        setIdCategoria(data.idcategoria);
        setIdEditora(data.ideditora);
    }

    const handleCheckboxChange = (e) => {
        setEmprestado(e.target.checked);
    };


    //Método que verifica qual ação deve ser executada
    const salvar = () => {
        if (id)
            alterar();
        else
            inserir();
    }

    const inserir = async () => {
        const json = {
            "titulo": titulo,
            "ano": ano,
            "paginas": paginas,
            "edicao": edicao,
            "resumo": resumo,
            "emprestado": emprestado,
            "idcategoria": idcategoria,
            "ideditora": ideditora,
        };
        await axios.post(`http://localhost:4000/livro`, json);
        voltar();
    }

    const alterar = async () => {
        const json = {
            "titulo": titulo,
            "ano": ano,
            "paginas": paginas,
            "edicao": edicao,
            "resumo": resumo,
            "emprestado": emprestado,
            "idcategoria": idcategoria,
            "ideditora": ideditora,
        };
        await axios.put(`http://localhost:4000/livro/${id}`, json);
        voltar();
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            await axios.delete(`http://localhost:4000/livro/${id}`);
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
            <h1>{(id) ? 'Alterar livro' : 'Inserir livro'}</h1>

            <h2>{titulo}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} />
                    <Form.Label>Ano</Form.Label>
                    <Form.Control type="number"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)} />
                    <Form.Label>Páginas</Form.Label>
                    <Form.Control type="number"
                        value={paginas}
                        onChange={(e) => setPaginas(e.target.value)} />
                    <Form.Label>Edição</Form.Label>
                    <Form.Control type="number"
                        value={edicao}
                        onChange={(e) => setEdicao(e.target.value)} />
                    <Form.Label>Resumo</Form.Label>
                    <Form.Control type="text"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)} />
                    <Form.Label>Emprestado</Form.Label>
                    <Form.Check
                        type="checkbox"
                        id="checked"
                        label="Sim"
                        checked={emprestado}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Label>Cód. Categoria</Form.Label>
                    <Form.Control type="number"
                        value={idcategoria}
                        onChange={(e) => setIdCategoria(e.target.value)} />
                    <Form.Label>Cód. Editora</Form.Label>
                    <Form.Control type="number"
                        value={ideditora}
                        onChange={(e) => setIdEditora(e.target.value)} />
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