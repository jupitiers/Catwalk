import React, {useEffect, useContext} from 'react';
import ModalButton from './ModalButton.jsx';
import styles from './cardPicture.module.css';

const CardPicture = props => {

  return (props.thumbnailUrl ?
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(${props.thumbnailUrl})` }}>
      <ModalButton relatedId={props.relatedId}/>
    </div> :
    <div className={styles.cardPictureArea} style={{ backgroundImage: `url(https://customercare.igloosoftware.com/.api2/api/v1/communities/10068556/previews/thumbnails/4fc20722-5368-e911-80d5-b82a72db46f2?width=680&height=680&crop=False)` }}>
      <ModalButton relatedId={props.relatedId}/>
    </div>
  )
}

export default CardPicture;