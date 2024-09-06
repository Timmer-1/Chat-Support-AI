"use client"
import { useState } from "react";
import { Box, Stack, TextField, Button } from "@mui/material"

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! How can I assist you today?'
    },
  ]);

  const [message, setMessage] = useState('');

  const handleClick = async () => {
    if (message.trim() === '') return;

    const newMessage = { role: 'user', content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, newMessage])
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }
      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      result += text;
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          return prevMessages.slice(0, -1).concat({ ...lastMessage, content: lastMessage.content + text });
        } else {
          return [...prevMessages, { role: 'assistant', content: text }];
        }
      });
      return reader.read().then(processText);
    });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      sx={{ backgroundColor: 'white' }}
    >
      <Stack direction={"column"} spacing={2} overflow={'auto'}>
        <Stack direction={'column'} spacing={2}>
          {
            messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                  color="white"
                  borderRadius={16}
                  p={2}
                  maxWidth="60%"
                >
                  {message.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button variant="contained" onClick={handleClick}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  )
}
