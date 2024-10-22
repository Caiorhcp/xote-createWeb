import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; 

const EditEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    image_url: '',
    title: '',
    description: '',
    date: '',
    time: '',
    type: '',
    pay: false,
    localgoogleurl: '',
  });

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

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventData(event);
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      await axios.put(`https://xote-api-development.up.railway.app/xote/put/${selectedEvent._id}`, eventData);
      alert('Evento atualizado com sucesso!');
      // Limpar a seleção após a atualização
      setSelectedEvent(null);
      setEventData({
        image_url: '',
        title: '',
        description: '',
        date: '',
        time: '',
        type: '',
        pay: false,
        localgoogleurl: '',
      });
    } catch (error) {
      console.error('Erro ao atualizar o evento:', error);
    }
  };

  return (
    <div>
      <h1>Editar Eventos</h1>
      <h2>Selecione um evento para editar:</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <button onClick={() => handleSelectEvent(event)}>{event.title}</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <form onSubmit={handleSubmit}>
          <h3>Editando: {selectedEvent.title}</h3>
          <input
            type="text"
            name="image_url"
            placeholder="URL da Imagem"
            value={eventData.image_url}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={eventData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={eventData.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Tipo"
            value={eventData.type}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="pay"
              checked={eventData.pay}
              onChange={handleChange}
            />
            Evento pago?
          </label>
          <input
            type="text"
            name="localgoogleurl"
            placeholder="URL do Local no Google Maps"
            value={eventData.localgoogleurl}
            onChange={handleChange}
          />
          <button type="submit">Atualizar Evento</button>
        </form>
      )}
    </div>
  );
};

export default EditEvent;
