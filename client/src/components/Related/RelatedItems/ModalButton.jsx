import React, {useEffect, useContext, useState} from 'react';
import styles from './modalButton.module.css';
import ComparisonModal from './ComparisonModal.jsx';

const ModalButton = props => {
  const [showModal, setShowModal] = useState(false); // note: change back to false

  let openModal = () => {
    setShowModal(!showModal);
  };

  let closeOpenModal = e => {
    if (e.target.id === 'modalBackground') {
      setShowModal(!showModal);
    }
  };

  return (
    <div>
      <button className={styles.modalButton} onClick={openModal}><i className={"far fa-star"}></i></button>
      {showModal ? <ComparisonModal showModal={showModal} setShowModal={setShowModal} onClick={closeOpenModal} relatedId={props.relatedId} data={props.data} index={props.index} movement={props.movement}/> : null}
    </div>
  )
}

export default ModalButton;