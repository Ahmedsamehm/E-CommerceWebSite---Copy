import React, { useContext, useEffect } from 'react'

import { ProductsContext } from '../../Context/ProductsContext'
import Products from '../Products/Products';
import Loading from '../loading/Loading';



export default function ProductsPage() {
  const { products, isLoading ,setIsLoading} = useContext(ProductsContext)
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 50)
  }, [])
  return (
    <>
      <section id="ProductsPage">
      {isLoading ? <Loading /> :
         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
         {products.map((product, index) => {
           return <Products product={product} key={index}  />;
        })}
       </div>
      
      
      }
      </section>
    
       
      
      
 
    
    
    </>
  )
}
