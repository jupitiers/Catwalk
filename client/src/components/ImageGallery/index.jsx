import React, { useState, useEffect, useRef } from 'react';
import styles from './image.module.css';

const ImageGallery = () => {

  const [ images, setImages ] = useState([
    {
      src: 'https://i.imgur.com/CWbILwR.jpg',
      active: true
    },
    {
      src: 'https://i.imgur.com/zD7uTjm.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/jXLpARE.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/CWbILwR.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/zD7uTjm.jpg',
      active: false
    },
    {
      src: 'https://i.imgur.com/jXLpARE.jpg',
      active: false
    }
  ])

  const [ mainImg, setMainImg ] = useState(images[0]);
  const [ modal, setModal ] = useState(false)
  const modalWrapper = useRef()

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
      current--
    }
    const updateImages = images.map((img, i) => {
      if(i === current) {
        img.active = true;
      } else {
        img.active = false;
      }
      return img
    })
    setImages(updateImages);
    if(current == 0) {
      setMainImg(images[current])
    } else {
      setMainImg(images[current])
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
      return img
    })
    setImages(updateImages);
    if(current == 0) {
      setMainImg(images[current])
    } else {
      setMainImg(images[current])
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
            <img src={mainImg.src} className={styles.modalImg} />
            <p className={styles.close} onClick={closeModal}>X</p>
          </div>
        </div>
        :
        null
      }
        <div className={styles.imgDiv}>
        <div className={styles.thumbNailWrapper}>
          {
            images.map((img, i) => {
              return (
                <div className={styles.thumbNailDiv} key={i}>
                   <img src={img.src} className={img.active ? styles.active : styles.thumbNailImg} onClick={() => updateMainImg(i)}/>
                </div>
              )
            })
          }
          <i className={`fas fa-arrow-down ${styles.arrowDown}`}></i>
        </div>
        <div className={styles.arrowDiv}>
          <i className={`fas fa-arrow-left ${styles.arrowLeft}`} onClick={moveLeft}></i>
          <div className={styles.mainImgDiv}>
            <img src={mainImg.src} className={styles.mainImg} />
          </div>
          <i className={`fas fa-arrow-right ${styles.arrowRight}`} onClick={moveRight}></i>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery;