import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';


interface ITask{
    id: number;
    idade: string
    name: string;
    ra: string;
    data_de_nascimento: string;
    endereco: string;
    matriculado: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Cadastros: React.FC = () => {
 
    const [cadastros, setCadastros] = useState<ITask[]>([])
    const history = useHistory()
 
    useEffect(() => {
        loadCadastros()
    }, [])
 
    async function loadCadastros() {
        const response = await api.get('/cadastros')
        console.log(response);
        setCadastros(response.data)
    }

    function formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }

    function newCadastro() {
        history.push('/alunos_cadastro')
    }


    function editCadastro(id: number) {
        history.push(`/alunos_cadastro/${id}`)
    }

    function viewCadastro(id: number) {
        history.push(`/cadastros/${id}`)
    }

    async function finishedCadastro(id: number) {
        await api.patch(`/cadastros/${id}`)
        loadCadastros()
    }

    async function deleteCadastro(id: number) {
        await api.delete(`/cadastros/${id}`)
        loadCadastros()
    }
 

    return (
        
        <div className="container">
            <br />
            <div className="cadastro-header">
                <h1>Página de Cadastros</h1>
                <Button variant="dark" size="sm" onClick={newCadastro}>Novo Cadastro</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>IDADE</th>
                    <th>Data de Nascimento</th>
                    <th>Endereço</th>
                    <th>Data de Atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cadastros.map(cadastro => (
                            <tr key={cadastro.id}>
                            <td>{cadastro.id}</td>
                            <td>{cadastro.name}</td>
                            <td>{cadastro.ra}</td>
                            <td>{cadastro.idade}</td>
                            <td>{cadastro.data_de_nascimento}</td>
                            <td>{cadastro.endereco}</td>
                            <td>{formatDate(cadastro.updated_at)}</td>
                            <td>{cadastro.matriculado ? "Matriculado" : "Não Matriculado"}</td>
                            <td>
                                    <Button size="sm" variant="primary" onClick={() => editCadastro(cadastro.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="success" onClick={() => finishedCadastro(cadastro.id)}>Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewCadastro(cadastro.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteCadastro(cadastro.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}
 
export default Cadastros;