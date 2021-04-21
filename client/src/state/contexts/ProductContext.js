import React, { createContext, useContext, useState } from 'react';

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {

  const [selectedProduct, setSelectedProduct] = useState({});

  const [productList, setProductList] = useState([]);

  const [styles, setStyles] = useState({})

  return (
    <ProductContext.Provider
      value={{
        productList,
        selectedProduct,
        styles,
        setProductList,
        setSelectedProduct,
        setStyles
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
