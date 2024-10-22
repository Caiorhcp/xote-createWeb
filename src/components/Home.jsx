// src/components/Home.jsx
import { Link } from 'react-router-dom';
import './Home.css'; // Adicione um arquivo CSS para estilização

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao Xote Eventos!</h1>
      <p>Crie, edite e exclua seus eventos facilmente!</p>
      <div className="nav-links">
        <Link to="/create" className="nav-link">Criar Evento</Link>
        <Link to="/edit" className="nav-link">Editar Evento</Link>
        <Link to="/delete" className="nav-link">Deletar Evento</Link>
        <Link to="/list" className="nav-link">Listar Eventos</Link> {/* Página de listar eventos */}
      </div>
    </div>
  );
};

export default Home;
