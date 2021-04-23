import React, {useEffect, useContext} from 'react';
import ModalButton from './ModalButton.jsx';
import styles from './cardPicture.module.css';

const CardPicture = props => {
  return (
    <div className={styles.cardPictureArea}>
      <ModalButton relatedId={props.relatedId} data={props.data} index={props.index} movement={props.movement}/>
    </div>
  )
}

export default CardPicture;