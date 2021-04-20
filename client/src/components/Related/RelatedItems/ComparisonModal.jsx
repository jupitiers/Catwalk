import React, {useEffect, useContext} from 'react';
import styles from './comparisonModal.module.css';

const ComparisonModal = props => {
  return (
    <div>
      {props.showModal ? <div>Hi</div> : null}
    </div>
  )
}

export default ComparisonModal;