import { AppBar, Box, Button, TextField, Typography, Container, Toolbar, Link, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';
import { Link as RouterLink } from 'react-router-dom'

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    console.log('restaurante atualizado no API')
                })

        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => console.log('restaurante cadastrado no API'))
        }
    }


    return (
        <>
            <Box>
                <Container maxWidth='lg' sx={{ marginTop: 1 }}>
                    <Paper sx={{ p: 2 }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                            <Typography component="h1" variant="h6">Formulário Restaurante</Typography>
                            <Box component='form' sx={{ width: "100%" }} onSubmit={onSubmitForm}>
                                <TextField value={nomeRestaurante}
                                    onChange={evento => setNomeRestaurante(evento.target.value)}
                                    label="cadastrar restaurante"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <Button sx={{ marginTop: 1 }} type='submit' fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>

       
        </>
    )
}

export default FormularioRestaurante