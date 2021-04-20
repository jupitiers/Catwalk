import React, {useEffect, useContext, useState} from 'react';
import styles from './modalButton.module.css';
import ComparisonModal from './ComparisonModal.jsx';

const ModalButton = () => {
  const [showModal, setShowModal] = useState(false);

  let openModal = () => {
    setShowModal(!showModal)
  };

  return (
    <div>
      <button className={styles.modalButton} onClick={openModal}><i className={"far fa-star"}></i></button>
      <ComparisonModal showModal={showModal} setShowModal={setShowModal}/>
    </div>
  )
}

export default ModalButton;