import React, { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { IPaginacao } from '../../../interfaces/IPaginacao';

const AdministracaoRestaurante = () => {

const [restaurantes, setRestaurante] = useState<IRestaurante[]>( [] )

useEffect(() => {
    axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
    .then(response => {
        setRestaurante(response.data)
    })
    .catch(err => { 
        console.log(err)
    })
},[])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                    </TableRow>)}
                    
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdministracaoRestaurante;    