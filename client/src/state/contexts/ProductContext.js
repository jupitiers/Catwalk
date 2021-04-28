import React, { createContext, useContext, useState } from 'react';

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {

  const [ selectedProduct, setSelectedProduct ] = useState({});
  const [ productList, setProductList ] = useState([]);
  const [ styleList, setStyleList ] = useState({});
  const [ styleSelected, setStyleSelected ]= useState({});

  return (
    <ProductContext.Provider
      value={{
        productList,
        selectedProduct,
        styleList,
        styleSelected,
        setProductList,
        setSelectedProduct,
        setStyleList,
        setStyleSelected,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
