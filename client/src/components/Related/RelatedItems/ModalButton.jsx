import React, {useEffect, useContext, useState} from 'react';
import styles from './modalButton.module.css';
import ComparisonModal from './ComparisonModal.jsx';

const ModalButton = props => {
  const [showModal, setShowModal] = useState(false);

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
      <button className={styles.modalButton} onClick={openModal}><i className={"fas fa-star fa-lg"} id="modalButton"></i></button>
      {showModal ? <ComparisonModal onClick={closeOpenModal} relatedId={props.relatedId}/> : null}
    </div>
  )
}

export default ModalButton;