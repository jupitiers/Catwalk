import React, { useState, useEffect, useRef, useContext } from 'react';

// import context
import { APIContext } from '../../state/contexts/APIContext';
import { ProductContext } from '../../state/contexts/ProductContext';

// import styles
import styles from './image.module.css';

const ImageGallery = () => {

  // context state
  const { getProductStyles } = useContext(APIContext);
  const { styleSelected } = useContext(ProductContext);

  // local state
  const [ productStyles, setProductStyles ] = useState({});
  const [ images, setImages ] = useState([]);
  const [ mainImg, setMainImg ] = useState({});
  const [ modal, setModal ] = useState(false);
  const modalWrapper = useRef();

  // update when the current style changes
  useEffect(() => {
    const images = styleSelected.photos && styleSelected.photos.map((img, i) => {
      if(i === 0) {
        img.active = true
      } else {
        img.active = false
      }
      return img
    });
    setImages(images);
    setMainImg(images && images[0]);
  },[styleSelected]);

  const updateMainImg = (index) => {
    const updateImages = images.map((img, i) => {
      if(index == i) {
        img.active = true;
      } else {
        img.active = false;
      }
      return img
    })
    setImages(updateImages);
    setMainImg(updateImages[index]);
  }

  const moveLeft = () => {
    let current = images.indexOf(mainImg);
    if(current === 0) {
      current = images.length - 1;
    } else {
      current--;
    }
    const updateImages = images.map((img, i) => {
      if(i === current) {
        img.active = true;
      } else {
        img.active = false;
      }
      return img;
    })
    setImages(updateImages);
    if(current == 0) {
      setMainImg(images[current]);
    } else {
      setMainImg(images[current]);
    }
  }

  const moveRight = () => {
    let current = images.indexOf(mainImg);
    if(current === images.length - 1) {
      current = 0;
    } else {
      current++;
    }
    const updateImages = images.map((img, i) => {
      if(i === current) {
        img.active = true;
      } else {
        img.active = false;
      }
      return img;
    })
    setImages(updateImages);
    if(current == 0) {
      setMainImg(images[current]);
    } else {
      setMainImg(images[current]);
    }
  }

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  const enableScroll = () => {
    window.onscroll = function() {};
  }

  const openModal = () => {
    setModal(true);
    disableScroll();
  }

  const closeModal = (e) => {
    if(e.target === modalWrapper.current || e.target.textContent === 'X' ) {
      setModal(false);
      enableScroll();
    }
  }

  return (
    <div className={styles.wrapper}>
      <i className={`fas fa-expand ${styles.expand}`} onClick={openModal}></i>
      {
        modal
        ?
        <div className={styles.modalWrapper} ref={modalWrapper} onClick={closeModal}>
          <div className={styles.modalDiv}>
            <i className={`fas fa-arrow-left ${styles.arrowLeft}`} onClick={moveLeft}></i>
            <img src={mainImg.url} className={styles.modalImg} />
            <i className={`fas fa-arrow-right ${styles.arrowRight}`} onClick={moveRight}></i>
          </div>
        </div>
        :
        null
      }
        <div className={styles.imgDiv}>
        <div className={styles.thumbNailWrapper}>
          {
            images && images.map((img, i) => {
              return (
                <div className={styles.thumbNailDiv} key={i}>
                   <img src={img.thumbnail_url} className={img.active ? styles.active : styles.thumbNailImg} onClick={() => updateMainImg(i)}/>
                </div>
              )
            })
          }
          <i className={`fas fa-arrow-down ${styles.arrowDown}`}></i>
        </div>
        <div className={styles.arrowDiv}>
          <i className={`fas fa-arrow-left ${styles.arrowLeft}`} onClick={moveLeft}></i>
          <div className={styles.mainImgDiv}>
            <img src={mainImg && mainImg.url} className={styles.mainImg} onClick={openModal}/>
          </div>
          <i className={`fas fa-arrow-right ${styles.arrowRight}`} onClick={moveRight}></i>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery;