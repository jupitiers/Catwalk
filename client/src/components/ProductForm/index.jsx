import React, { useState, useContext, useEffect } from 'react';

// import context
import { APIContext } from '../../state/contexts/APIContext';
import { ProductContext } from '../../state/contexts/ProductContext';
import { ReviewContext } from '../../state/contexts/ReviewsContext';

// import helpers ratings
import { createStarArray, getAvgRating } from '../../helpers/ratingsHelpers';
import { emptyStar, fullStar } from '../../helpers/starRatings';

// import styles
import styles from './product.module.css';


const ProductForm = () => {

  // context state
  const { getProductById, productId } = useContext(APIContext);
  const { reviews } = useContext(ReviewContext);
  const {
    selectedProduct,
    styleList,
    styleSelected,
    setStyleSelected
  } = useContext(ProductContext);

  // local state
  const [ stars, setStars ] = useState([]);
  const [ liked, setLiked ] = useState(false);
  const [ sizes, setSizes ] = useState([]);
  const [ quantity, setQuantity ] = useState({quantity: [1], size: ''});

  useEffect(() => {
    getProductById(productId.toString());
  }, [productId]);

  useEffect(() => {
    getProductById(productId.toString());
  }, [productId]);

  // used to update the reviews
  useEffect(() => {
    let total = 0;
    reviews.forEach(r => total += r.rating);
    let avg = total / reviews.length;
    let stars = createStarArray(avg);

    const size = [];
    for(const key in styleSelected.skus) {
      size.push(styleSelected.skus[key]);
    }
    setSizes(size);
    setStars(stars);
  },[reviews, styleSelected]);

  const submit = (e) => {
    e.preventDefault();
  }

  const updateQuantity = (e) => {
    const { value } = e.target;
    for(const size of sizes) {
      if(size.size === value) {
        let q = size.quantity;
        size.quantity = [];
        for(let i = 1; i <= q; i++) {
          size.quantity.push(i);
        }
        setQuantity(size);
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.starDiv}>
        {stars && stars.map((star, idx) => <span key={idx}>{star}</span>)}
      </div>
      <h2 className={styles.h2}>{selectedProduct.category}</h2>
      <h1 className={styles.h1}>{selectedProduct.name}</h1>
      <div className={styles.divPrice}>
        {
          styleSelected.sale_price
          ?
          <>
          <p className={styles.priceDrop}>${styleSelected.original_price}</p>
          <p className={styles.salePrice}>${styleSelected.sale_price}</p>
          </>
          :
          <p className={styles.price}>${selectedProduct.default_price}</p>
        }
      </div>
      <p className={styles.selectStyle}><b className={styles.bold}>style ></b> selected style</p>
      <form onSubmit={submit}>
        <ul className={styles.ul}>
          {
            styleList.results && styleList.results.map((s, i) => {
              return (
                <li className={styles.li} key={i} onClick={() => setStyleSelected(s)}>
                  {
                    styleSelected.style_id === s.style_id
                    ?
                    <i className={`fas fa-check ${styles.checkMark}`}></i>
                    :
                    null
                  }
                  <img src={s.photos[0].thumbnail_url} className={styles.imgStyles} />
                </li>
              )
            })
          }
      </ul>
      <div className={styles.divDropDown}>
          <div className={styles.divSelect}>
              <select className={styles.selectSize} onChange={updateQuantity}>
                <option className={styles.optionSize}>select size</option>
                {
                  sizes && sizes.map((s, i) => {
                    return (
                      <option className={styles.optionSize} key={i}>{s.size}</option>
                    )
                  })
                }
              </select>
              <select className={styles.selectNum}>
                {
                 quantity.quantity.map((q, i) => {
                    return (
                      <option className={styles.optionNum} key={i}>{q}</option>
                    )
                  })
                }
              </select>
          </div>
          <div className={styles.divButton}>
              <button className={styles.button}>add to bag</button>
              <div className={styles.starLikeDiv} onClick={() => setLiked(!liked)}>
                {
                  liked
                  ?
                  fullStar
                  :
                  emptyStar
                }
              </div>
          </div>
      </div>
      </form>
    </div>
  )
}

export default ProductForm;