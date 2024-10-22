import { useState } from 'react';
import axios from 'axios';
import '../styles.css'; 


const CreateEvent = () => {
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

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
    setError(''); // Limpa o erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.description) {
      setError('Título e descrição são obrigatórios!');
      return;
    }

    try {
      await axios.post('https://xote-api-development.up.railway.app/xote/post', eventData);
      alert('Evento criado com sucesso!');
      // Resetar o formulário
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
      console.error('Erro ao criar o evento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Evento</h1>
      {error && <div className="error">{error}</div>}
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
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        value={eventData.description}
        onChange={handleChange}
        required
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
      <button type="submit">Criar Evento</button>
    </form>
  );
};

export default CreateEvent;
