import React, { useContext, useEffect } from 'react';
import { FileUpload } from './FileUpload';
import { CharacteristicsInputs } from './CharacteristicsInputs';
import { RatingInput } from './RatingInput';
import { RecmmendInput } from './RecmmendInput';
import { TextInputs } from './TextInputs';
import styles from './createReview.module.css';
import { ReviewContext } from '../../../state/contexts/ReviewsContext';
import { ProductContext } from '../../../state/contexts/ProductContext';
import { APIContext } from '../../../state/contexts/APIContext';

export const CreateReview = ({ children }) => {
  // context imports
  const {
    showCreate,
    hideCreate,
    newReview,
    setNewReview,
    validateForm,
    loading, setLoading,
  } = useContext(ReviewContext);
  const {
    getProductById,
    createNewReview,
  } = useContext(APIContext);
  const { selectedProduct } = useContext(ProductContext);
  // using helper functions
  // modal class for show / hide styles
  const showHideClassName = showCreate ? styles.show : styles.hide;

  // get current product by Id
  useEffect(() => {
    getProductById();
  }, []);

  // setting product id when selected product changes
  useEffect(() => {
    setNewReview({
      ...newReview,
      product_id: selectedProduct.id,
    });
  }, [selectedProduct]);

  // validate then submit form then clear inputs
  // display loading state while making api request
  const submitForm = async (e) => {
    e.preventDefault();
    const areErrors = validateForm();
    if (!areErrors) {
      setLoading(true);
      try {
        await createNewReview(newReview);
        setTimeout(() => {
          setLoading(false);
          hideCreate();
        }, 2000);
        setNewReview({
          prodcut_id: selectedProduct.id,
          name: '',
          email: '',
          summary: '',
          body: '',
          rating: 0,
          recommend: false,
          characteristics: {},
          photos: [],
        });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className={showHideClassName}>
      <section className={styles.formModalMain}>
        {children}
        <>
          <span
            onClick={hideCreate}
            className={styles.iconWrapper}
          >
            <i className="far fa-times-circle" />
          </span>
          <div className={styles.formContainer}>
            <h2 className={styles.formHeader}>Write your review</h2>
            <h3>
              about the
              {' '}
              {selectedProduct.name}
            </h3>
            <form
              onSubmit={submitForm}
              className={styles.form}
            >
              <TextInputs />
              <RatingInput />
              <RecmmendInput />
              <CharacteristicsInputs />
              <FileUpload />
              <div className={styles.submit}>
                <button type="submit">
                  {loading ? (
                    <span className={styles.loading}>Submitting</span>
                  )
                    : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </>
      </section>
    </div>
  );
};
