// components/Navbar.js

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box'


const Navbar = () => {
  return (
    <>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Arsenal of A.I.s
        </Typography>
        <Link href="/" passHref>
          <Button sx={{bgcolor: "darkblue"}} color="inherit">Home</Button>
        </Link>
        <Link href={{
          pathname: '/ai',
          query: {
            ai: 'ChatGPT'
          }
        }} passHref>
          <Button color="inherit">ChatGPT</Button>
        </Link>
        <Link href={{
          pathname: '/ai',
          query: {
            ai: 'Gemini'
          }
        }} passHref>
          <Button color="inherit">Gemini</Button>
        </Link>
        <Link href={{
          pathname: '/ai',
          query: {
            ai: 'Llama'
          }
        }} passHref>
          <Button color="inherit">Llama</Button>
        </Link>
      </Toolbar>
    </AppBar>
    <Box sx={{mb: 5, mt:10 }}>
        :)
    </Box>
    </>
  );
};

export default Navbar;
