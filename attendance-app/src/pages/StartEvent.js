import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

function StartEvent() {
  const [eventId, setEventId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleStartEvent = async () => {
    if (!eventId) {
      setResponseMessage('Event ID cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/operator/wallets', {
        eventId,
      });
      setResponseMessage(`Event started successfully: ${response.data.message}`);
    } catch (error) {
      console.error('Error starting event:', error);
      setResponseMessage('Failed to start the event. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Start Event
      </Typography>
      <TextField
        label="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartEvent}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Start Event
      </Button>
      {responseMessage && (
        <Typography
          variant="body1"
          style={{ marginTop: '16px', color: responseMessage.includes('successfully') ? 'green' : 'red' }}
        >
          {responseMessage}
        </Typography>
      )}
    </Container>
  );
}

export default StartEvent;