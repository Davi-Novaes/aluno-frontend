import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface ITask{
    id: number;
    name: string;
    ra: string;
    idade: string
    data_de_nascimento: string;
    endereco: string;
    matriculado: boolean;
    created_at: Date;
    updated_at: Date;
}
 
const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [cadastro, setCadastro] = useState<ITask>()

    function back() {
        history.goBack()
    }

    async function findCadastro() {
        const response = await api.get(`/tasks/${id}`)
        console.log(response)
        setCadastro(response.data)
    }

    useEffect(() => {
        findCadastro()
    }, [id])

    return (
        <div className="container">
            <br />
            <div className="cadastro-header">
                <h1>Detalhes do Cadastro</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{cadastro?.name}</Card.Title>

                    <Card.Text>
                    {cadastro?.ra}
                    <br/>
                    {cadastro?.data_de_nascimento}
                    <br/>
                    {cadastro?.idade}
                    <br/>
                    {cadastro?.endereco}
                    <br/>
                    {cadastro?.matriculado ? "Matriculado" : "Não Matriculado"}
                    <br />
                    <strong>Data de Cadastro: </strong>
                    {moment(cadastro?.created_at).format('DD/MM/YYYY')}
                    <br />
                    <strong>Data de Atualização: </strong>
                    {moment(cadastro?.updated_at).format('DD/MM/YYYY')}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    );
}

export default Detail;
