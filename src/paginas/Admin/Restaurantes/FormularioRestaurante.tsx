import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            }) 
                .then( () => {
                    console.log('restaurante atualizado no API')
                } )

        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(response => console.log('restaurante cadastrado no API'))
        }
    }




    return (
        <form onSubmit={onSubmitForm}>
            <TextField value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="standard-basic"
                label="cadastrar restaurante"
                variant="standard" />
            <Button type='submit' variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante