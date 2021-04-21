import React, {useEffect, useContext} from 'react';
import CardPicture from './CardPicture.jsx';
import CardDescription from './CardDescription.jsx';
import styles from './relatedItemCard.module.css';

const RelatedItemCard = props => {
  // console.log(props.data)
  return (
    <div className={styles.itemCard}>
      <CardPicture relatedId={props.relatedId} data={props.data}/>
      <CardDescription relatedId={props.relatedId} data={props.data}/>
    </div>
  )
}

export default RelatedItemCard;