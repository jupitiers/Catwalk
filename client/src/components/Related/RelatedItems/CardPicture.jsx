import React, {useEffect, useContext} from 'react';
import ModalButton from './ModalButton.jsx';
import styles from './cardPicture.module.css';

const CardPicture = props => {
  // if (props.thumbnailUrl == null) {
  //   props.thumbnailUrl =
  // }

  return (
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(${props.thumbnailUrl})` }}>
      <ModalButton relatedId={props.relatedId}/>
    </div>
  )
}

export default CardPicture;