import { useState, useEffect } from 'react';
import styles from './tilesbackground.module.css'

const Tilesbackground = () => {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        for (let i = 0; i < 1599; i++) {
            setTiles((prevElements) => [
                ...prevElements,
                `Tile ${prevElements.length + 1}`,
            ]);
        }  
  }, []);

  return (
    <>
      <div id={styles.container}>
        {tiles.map((tile, index) => (
          <div key={index} class={styles.tile}>
          </div>
        ))}
       </div>
    </>
  );
};

export default Tilesbackground;