import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function LivroCadastro() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [paginas, setPaginas] = useState('');
    const [edicao, setEdicao] = useState('');
    const [resumo, setResumo] = useState('');
    const [emprestado, setEmprestado] = useState(false);
    const [idcategoria, setIdCategoria] = useState('');
    const [ideditora, setIdEditora] = useState('');
    const [erro, setErro] = useState('');

    const voltar = () => {
        navigate('/livros');
    }

    const selecionar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/livro/${id}`);
            setTitulo(data.titulo);
            setAno(data.ano);
            setPaginas(data.paginas);
            setEdicao(data.edicao);
            setResumo(data.resumo);
            setEmprestado(data.emprestado);
            setIdCategoria(data.idcategoria);
            setIdEditora(data.ideditora);
        } catch (error) {
            setErro('Erro ao carregar livro.');
        }
    }

    const handleCheckboxChange = (e) => {
        setEmprestado(e.target.checked);
    };

    const salvar = async () => {
        try {
            if (id) await alterar();
            else await inserir();
            voltar();
        } catch (error) {
            setErro('Erro ao salvar livro.');
        }
    }

    const inserir = async () => {
        const json = {
            titulo,
            ano,
            paginas,
            edicao,
            resumo,
            emprestado,
            idcategoria,
            ideditora,
        };
        await axios.post(`http://localhost:4000/livro`, json);
    }

    const alterar = async () => {
        const json = {
            titulo,
            ano,
            paginas,
            edicao,
            resumo,
            emprestado,
            idcategoria,
            ideditora,
        };
        await axios.put(`http://localhost:4000/livro/${id}`, json);
    }

    const excluir = async () => {
        if (window.confirm('Deseja excluir agora?')) {
            try {
                await axios.delete(`http://localhost:4000/livro/${id}`);
                voltar();
            } catch (error) {
                setErro('Erro ao excluir livro.');
            }
        }
    }

    useEffect(() => {
        if (id)
            selecionar();
    }, [id, selecionar]);

    return (
        <>
            <h1>{id ? 'Alterar Livro' : 'Inserir Livro'}</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>
                {/* Adicione os outros campos do formulário aqui... */}
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        id="emprestado"
                        label="Emprestado"
                        checked={emprestado}
                        onChange={handleCheckboxChange}
                    />
                </Form.Group>
                <Button variant="primary" onClick={salvar}>
                    Salvar
                </Button>
                <Button variant="secondary" onClick={voltar}>
                    Cancelar
                </Button>
                {id && (
                    <Button variant="danger" onClick={excluir}>
                        Excluir
                    </Button>
                )}
                {erro && <p className="text-danger">{erro}</p>}
            </Form>
        </>
    );
}
