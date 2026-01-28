import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

const FormularioRestaurante = () => {

const [nomeRestaurante, setNomeRestaurante] = useState('')

const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    
        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
        .then(response => console.log('restaurante cadastrado no API'))
    }

return (
        <form onSubmit={onSubmitForm}>
            <TextField  value={nomeRestaurante}
             onChange={evento => setNomeRestaurante(evento.target.value)}
             id="standard-basic" 
             label="cadastrar restaurante" 
             variant="standard" />
            <Button type='submit' variant="outlined">Cadastrar</Button>
        </form>
    )
}

export default FormularioRestaurante