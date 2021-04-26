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
  const { getProductById } = useContext(APIContext);
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
  const [ quantity, setQuantity ] = useState(0);

  // used to update the reviews
  useEffect(() => {
    let total = 0;
    reviews.forEach(r => total += r.rating);
    let avg = total / reviews.length;
    let stars = createStarArray(avg);
    setStars(stars)
  },[reviews])

  // used to update the sizes
  useEffect(() => {
    const size = [];
    for(const key in styleSelected.skus) {
      size.push(styleSelected.skus[key])
    }
    setSizes(size);
  },[styleSelected])

  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.starDiv}>
        {stars && stars.map((star, idx) => <span key={idx}>{star}</span>)}
      </div>
      <h2 className={styles.h2}>{selectedProduct.category}</h2>
      <h1 className={styles.h1}>{selectedProduct.name}</h1>
      <p className={styles.price}>${selectedProduct.default_price}</p>
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
              <select className={styles.selectSize}>
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
                  [1,2,3,4,5].map((q, i) => {
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