import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './DeleteEvent.css';

Modal.setAppElement('#root'); 

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://xote-api-development.up.railway.app/xote/get');
        setEvents(response.data.XoteEventos);
      } catch (error) {
        setError('Erro ao buscar eventos');
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openModal = (event) => {
    setEventToDelete(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventToDelete(null);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;

    try {
      await axios.delete(`https://xote-api-development.up.railway.app/xote/delete/${eventToDelete._id}`);
      setEvents(events.filter(event => event._id !== eventToDelete._id));
      alert('Evento excluído com sucesso!');
    } catch (error) {
      setError('Erro ao excluir o evento');
      console.error('Erro ao excluir o evento:', error);
    } finally {
      closeModal();
    }
  };

  if (loading) return <p>Carregando eventos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Deletar Evento</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <img src={event.image_url} alt={event.title} />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Data:</strong> {event.date}</p>
            <p><strong>Hora:</strong> {event.time}</p>
            <p><strong>Tipo:</strong> {event.type}</p>
            <p><strong>Status:</strong> {event.pay ? 'Pago' : 'Não Pago'}</p>
            <p>
              Google Maps: <a href={event.localgoogleurl} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a>
            </p>
            <button onClick={() => openModal(event)}>Excluir Evento</button>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Confirmar Exclusão</h2>
        <p>Você realmente deseja excluir o evento "{eventToDelete?.title}"?</p>
        <button onClick={handleDelete}>Confirmar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
  );
};

export default DeleteEvent;
