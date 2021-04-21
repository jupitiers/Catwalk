import React, {useEffect, useContext} from 'react';
import CardPicture from './CardPicture.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './relatedItemCard.module.css';

const RelatedItemCard = props => {
  return (
    <div className={styles.itemCard}>
      <CardPicture relatedId={props.relatedId} data={props.data} index={props.index} movement={props.movement}/>
      <CardDescription relatedId={props.relatedId} data={props.data} index={props.index} movement={props.movement}/>
    </div>
  )
}

export default RelatedItemCard;