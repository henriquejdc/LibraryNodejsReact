import TituloListagem from "../../componentes/TituloListagem";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Emprestimo() {
    const [dados, setDados] = useState([]);

    const listar = async () => {
        const { data } = await axios.get('http://localhost:4000/emprestimo');
        setDados(data);
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <TituloListagem titulo="Listagem de emprestimos"
                subtitulo="Neste local você gerencia todos os emprestimos da biblioteca."
                url="/emprestimo" />

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Código</th>
                        <th>Emprestimo</th>
                        <th>Vencimento</th>
                        <th>Devolução</th>
                        <th>Cód. Livro</th>
                        <th>Cód. Pessoa</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((d, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={'/emprestimo/' + d.idemprestimo}
                                    className='btn btn-primary'>Alterar</Link>
                            </td>
                            <td>{d.idemprestimo}</td>
                            <td>{d.emprestimo}</td>
                            <td>{d.vencimento}</td>
                            <td>{d.devolucao}</td>
                            <td>{d.idlivro}</td>
                            <td>{d.idpessoa}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}