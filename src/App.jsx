// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import EditEvent from './components/EditEvent';
import DeleteEvent from './components/DeleteEvent';
import Home from './components/Home'; // Adicionando a Home
import ListEvents from './components/ListEvents';
import './App.css'; // Importando o CSS
import './styles.css';

const App = () => {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Página inicial */}
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit" element={<EditEvent />} /> {/* Removendo o ID */}
        <Route path="/delete" element={<DeleteEvent />} />
        <Route path="/list" element={<ListEvents />} /> 
      </Routes>
    </Router>
  );
};

export default App;
