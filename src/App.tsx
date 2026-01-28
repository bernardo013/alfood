import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurante from './paginas/Admin/Restaurantes/AdministracaoRestaurante'
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} /> 
      <Route path="admin/restaurantes" element= {<AdministracaoRestaurante />} />
      <Route path="admin/restaurantes/novo" element= {<FormularioRestaurante />} />
      <Route path="admin/restaurantes/:id" element= {<FormularioRestaurante />} />
      <Route />
    </Routes>
  );
}

export default App;
