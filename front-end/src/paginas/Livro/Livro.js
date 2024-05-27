import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Livro() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/livro');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de livros"
                subtitulo="Neste local você gerencia todos os livros da biblioteca."
                url="/livro" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Ano</th>
                        <th>Páginas</th>
                        <th>Resumo</th>
                        <th>Edição</th>
                        <th>Emprestado</th>
                        <th>Cód. Categoria</th>
                        <th>Cód. Editora</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/livro/' + d.idlivro}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idlivro}</td>
                            <td>{d.titulo}</td>
                            <td>{d.ano}</td>
                            <td>{d.paginas}</td>
                            <td>{d.edicao}</td>
                            <td>{d.resumo}</td>
                            <td>{d.emprestado ? 'Sim' : 'Não'}</td>
                            <td>{d.idcategoria}</td>
                            <td>{d.ideditora}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}