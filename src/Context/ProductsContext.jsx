import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
//use productConetext in useContext 
export const ProductsContext = createContext()

export default function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {

    setIsLoading(true)
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProducts(data.data);
    setIsLoading(false)
    
    

  }
  return (
    <>
         <ProductsContext.Provider value={{products,setProducts,isLoading,setIsLoading}}>
         {children }
     </ProductsContext.Provider>
      
      
     
    
    
    </>
  )
}
