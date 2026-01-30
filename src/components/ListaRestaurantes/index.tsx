import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';
import http from '../../http';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    //obter restaurantes  
    axios.get<IPaginacao<IRestaurante>>("http://localhost:8000/api/v1/restaurantes/")
      .then(response => {
        const restaurantesData = response.data.results

        // Buscar todos os pratos
        http.get<IPrato[]>('pratos/')
          .then(pratosResponse => {
            const pratos = pratosResponse.data

            // Associar pratos aos restaurantes correspondentes
            const restaurantesComPratos = restaurantesData.map(restaurante => ({
              ...restaurante,
              pratos: pratos.filter(prato => prato.restaurante === restaurante.id)
            }))

            setRestaurantes(restaurantesComPratos)
          })
        setNextPage(response.data.next)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
      .then(response => {
        const novosRestaurantes = response.data.results

        // Buscar todos os pratos novamente para incluir os novos restaurantes
        http.get<IPrato[]>('pratos/')
          .then(pratosResponse => {
            const pratos = pratosResponse.data

            // Associar pratos aos novos restaurantes
            const novosRestaurantesComPratos = novosRestaurantes.map(restaurante => ({
              ...restaurante,
              pratos: pratos.filter(prato => prato.restaurante === restaurante.id)
            }))

            setRestaurantes([...restaurantes, ...novosRestaurantesComPratos])
          })
          .catch(err => {
            console.log('Erro ao buscar pratos:', err)
            // Se der erro, ainda assim adiciona os restaurantes sem pratos
            setRestaurantes([...restaurantes, ...novosRestaurantes.map(r => ({ ...r, pratos: [] }))])
          })

        setNextPage(response.data.next)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {nextPage && <button onClick={verMais}>
        Ver mais
      </button>}
    </section>
  )
}

export default ListaRestaurantes