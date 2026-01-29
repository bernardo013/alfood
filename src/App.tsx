import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurante from './paginas/Admin/Restaurantes/AdministracaoRestaurante'
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin';
import AdministracaoDePratos from './paginas/Admin/Pratos/AdministracaoDePratos';
import FormularioPrato from './paginas/Admin/Pratos/FormularioDePratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>

        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />


        <Route path="pratos" element={<AdministracaoDePratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />

      </Route>

    </Routes>
  );
}

export default App;
