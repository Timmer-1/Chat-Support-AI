'use client'

import { useState } from 'react'
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import Navbar from "@/app/components/navbar"

export default function Home() {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');

  const sampleText = `
  Trees are perennial plants characterized by an elongated stem, or trunk, that supports leaves and branches. They play a crucial role in ecosystems and provide numerous benefits, including:

1. **Oxygen Production**: Through photosynthesis, trees convert carbon dioxide into oxygen, making them essential for maintaining air quality.

2. **Habitat**: Trees provide habitat and food for a diverse array of wildlife, including birds, mammals, insects, and fungi.

3. **Climate Regulation**: Trees influence local and global climates by absorbing carbon dioxide, a significant greenhouse gas, thus helping to mitigate climate change.

4. **Soil Conservation**: Tree roots help anchor soil, preventing erosion and maintaining soil health. They also contribute to nutrient cycling.

5. **Water Cycle**: Trees play a role in the water cycle by absorbing and releasing water through transpiration, which can affect local humidity and precipitation patterns.

6. **Aesthetic and Recreational Value**: Trees enhance landscapes, provide shade, and serve as sites for recreation, relaxation, and cultural activities.

7. **Economic Value**: Trees provide timber, fruit, nuts, and other resources that contribute to local and global economies.

There are many different types of trees, which can be categorized into two main groups: deciduous trees, which shed their leaves annually, and coniferous trees, which typically keep their leaves (needles) year-round. Trees vary greatly in size, shape, and habitat preferences, with species adapted to different environmental conditions around the world.
`

  async function run() {
    try {
      const response = await fetch('/api/openai', {
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
      setResponseText(result.text);
      console.log(result.text.message.content)
      output.innerText = result.text.message.content
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
          Chat Bot [Llama]
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
