import React, {useEffect, useContext} from 'react';
import ModalButton from './ModalButton.jsx';
import styles from './cardPicture.module.css';

const CardPicture = () => {
  return (
    <div className={styles.cardPictureArea}>
      <ModalButton />
    </div>
  )
}

export default CardPicture;