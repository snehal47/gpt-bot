import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message1, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callAPI();
  };

  const callAPI = async () => {
    try {
      const response = await axios.post('/api/langchain', {
        
          message: message1
        
      });
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={message1} onChange={handleChange} />
          <button type="submit">Send</button>
        </div>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
};

export default Chatbot;
