import React, { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Button ,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import http from '../../../http';

const AdministracaoRestaurante = () => {

const [restaurantes, setRestaurante] = useState<IRestaurante[]>( [])

useEffect(() => {
    http.get<IRestaurante[]>("restaurantes/")
    .then(response => {
        setRestaurante(response.data)
    })
    .catch(err => { 
        console.log(err)
    })
},[])

const excluir = (restauranteParaSerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteParaSerExcluido.id}/`)
    .then( () => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteParaSerExcluido.id)
            setRestaurante([ ...listaRestaurante ])
        })
}
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<RouterLink to={`/admin/restaurantes/${restaurante.id}`}>Editar</RouterLink>]
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' color='error' onClick={() => {excluir(restaurante)}}>Excluir</Button> 
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

        </TableContainer>
    );
};

export default AdministracaoRestaurante;    