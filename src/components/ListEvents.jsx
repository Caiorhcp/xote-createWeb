import { useEffect, useState } from 'react';
import axios from 'axios';

const ListEvents = () => {
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

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <img src={event.image_url} alt="image"/>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Hora:</strong> {event.time}</p>
            <p><strong>Tipo:</strong> {event.type}</p>
            <p><strong>Status:</strong> {event.pay ? 'Pago' : 'Não Pago'}</p>
            <p>
              Google Maps: <a href={event.localgoogleurl} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListEvents;
