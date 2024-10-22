// src/components/DeleteEvent.jsx
import { useState, useEffect } from 'react';
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
    try {
      await axios.delete(`https://xote-api-development.up.railway.app/xote/delete/${id}`);
      alert('Evento deletado com sucesso!');
      setEvents(events.filter((event) => event._id !== id)); // Remove o evento da lista localmente
    } catch (error) {
      console.error('Erro ao deletar o evento:', error);
    }
  };

  return (
    <div>
      <h1>Deletar Eventos</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <img src={event.image_url} alt={event.title} style={{ width: '100px', height: 'auto' }} />
              <p>{event.description}</p>
              <p>{`Data: ${event.date} | Hora: ${event.time}`}</p>
              <a href={event.localgoogleurl} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
              <button onClick={() => handleDelete(event._id)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há eventos cadastrados.</p>
      )}
    </div>
  );
};

export default DeleteEvent;
