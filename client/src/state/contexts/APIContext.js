import React, {createContext, useContext, useState} from 'react';
import axios from 'axios'
import {REACT_APP_API_KEY} from '../../config/config.js';

export const APIContext = createContext({});

const APIProvider = ({children}) => {

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp'

// sample request to get all products

const getAllProducts = async () => {
  try {
    const products = await axios.get(`${baseURL}/products`, {
      headers: {'Authorization': REACT_APP_API_KEY}
    })
    console.log(products)
  }catch (err) {
    console.log(err)
  }
}



  return (
    <APIContext.Provider
      value={{
        getAllProducts,
      }}
    >
    {children}
    </APIContext.Provider>
  );
};

export default APIProvider;