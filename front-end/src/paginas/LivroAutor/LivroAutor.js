import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LivroAutor() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/livroautor');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de livros e autores"
                subtitulo="Neste local você gerencia todos os livros e autores da biblioteca."
                url="/livroautor" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Cód. Livro</th>
                        <th>Cód. Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/livroautor/' + d.idlivroautor}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idlivroautor}</td>
                            <td>{d.idlivro}</td>
                            <td>{d.idautor}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}