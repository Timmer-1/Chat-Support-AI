'use client'

import { useState } from 'react'
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import Navbar from "@/app/components/navbar" 

export default function Home() {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');

  async function run() {
    try {
      const response = await fetch('/api/gemai', {
        method: 'POST', // Make sure to use POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // Send the input question
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      output.innerText = result.text
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseText('An error occurred');
    }
  }

  function runSample() {
    output.innerText = sampleText
  }

  return (
<Container maxWidth="sm" sx={{bgcolor:"#2F2F2F"}}>
  <Navbar />
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Chat Bot [Gemini]
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            p: 2, 
            mb: 2,
            flexGrow: 1, 
            overflowY: 'auto', 
          }}
        >
          <Typography variant="body1" id="output">
          </Typography>
        </Paper>

        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          sx={{label:{color: "white"},input:{color:"white"} }}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Button 
          variant="contained" 
          color="primary" 
          onClick={run}
          sx={{ mt: 2, mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
