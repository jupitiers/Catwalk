import React, { createContext, useContext, useState } from 'react';

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
  const [sampleProduct, setSampleProduct] = useState({
    name: 'a product', id: 1,
  });
  const [selectedProduct, setSelectedProduct] = useState({});

  const [productList, setProductList] = useState([]);

  const someFunc = () => {
    console.log('hello from context');
  };

  return (
    <ProductContext.Provider
      value={{
        sampleProduct,
        setSampleProduct,
        productList,
        setProductList,
        someFunc,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
