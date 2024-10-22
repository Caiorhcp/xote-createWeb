// src/components/DeleteEvent.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://xote-api-development.up.railway.app/xote/get');
        setEvents(response.data.XoteEventos);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Você realmente deseja deletar este evento?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://xote-api-development.up.railway.app/xote/delete/${id}`);
        setEvents(events.filter(event => event._id !== id)); // Atualiza a lista removendo o evento deletado
        alert('Evento excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir o evento:', error);
      }
    }
  };

  return (
    <div>
      <h1>Deletar Evento</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Hora:</strong> {event.time}</p>
            <p><strong>Tipo:</strong> {event.type}</p>
            <p><strong>Status:</strong> {event.pay ? 'Pago' : 'Não Pago'}</p>
            <button onClick={() => handleDelete(event._id)}>Excluir Evento</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteEvent;
