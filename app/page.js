// pages/tiles.js

'use client'

import { useState, useEffect } from 'react';
import styles from './page.module.css'
import Head from 'next/head';
import {Box} from '@mui/material'
import Navbar from "@/app/components/navbar"

const TilesPage = () => {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        for (let i = 0; i < 1599; i++) {
            setTiles((prevElements) => [
                ...prevElements,
                `Tile ${prevElements.length + 1}`,
            ]);
        }  
        // const container = document.querySelector("#container");
        // const tile = document.querySelector(".tile");

        // for (let i = 0; i < 1599; i++) {
        // container.appendChild(tile.cloneNode());
        // }
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      <Navbar />
      <div id={styles.container}>
        {tiles.map((tile, index) => (
          <div key={index} class={styles.tile}>
          </div>
        ))}
       </div>
       <Box
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 255, 0.2)', // Blue tint
        backdropFilter: 'blur(10px)', // Blur everything behind
        border: '2px solid #003366', // Dark blue outline
        color: '#ffffff',
        zIndex: 9999, // Ensures the box is on top of other elements
      }}
    >
      <span>Hello there 😁, choose from a variety of chat bots🧙‍♂️</span>
    </Box>
    </>
  );
};

export default TilesPage;
