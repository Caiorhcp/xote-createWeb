// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import DeleteEvent from './components/DeleteEvent';
import Home from './components/Home'; 
import ListEvents from './components/ListEvents';
import './App.css'; 
import './styles.css';

const App = () => {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/create" element={<CreateEvent />} /> {/* criar */}
        <Route path="/edit" element={<EditEvent />} /> {/* editar */}
        <Route path="/delete" element={<DeleteEvent />} /> {/* ,Deletar */}
        <Route path="/list" element={<ListEvents />} />  {/* Listar */}
      </Routes>
    </Router>
  );
};

export default App;
