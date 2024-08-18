import React, { useContext, useEffect, useState } from "react";
import Products from "../Products/Products";
import { ProductsContext } from "../../Context/ProductsContext";
import ProductSlider from "../ProductSlider/ProductSlider";
import Loading from "../loading/Loading";
import Slider from "react-slick";
import HomeTopSlider from "../HomeTopSlider/HomeTopSlider";
import Image1 from '../../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import Image2 from '../../images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'




export default function Home() {
  const { products ,isLoading,setIsLoading } = useContext(ProductsContext);

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 50)
  }, [])

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  }, []);
  

  

  

  return (
   
      
    <>
      <section id="home">
      <div className="container mx-auto px-4 py-4">
    <div className="flex flex-col md:flex-row items-center gap-6 ">
      <div className="w-full md:w-2/3 lg:w-1/2 ">
        <HomeTopSlider />
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 space-y-4 flex flex-col items-center mx-auto">
        <img src={Image1} className="w-full max-w-sm h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" alt="Promotional image 1" />
        <img src={Image2} className="w-full max-w-sm h-auto object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" alt="Promotional image 2" />
      </div>
    </div>
  </div>


    {isLoading? (
      <Loading />
    ) : (
      <div>
        <div className="container">
          <div className="w-5/6 lg:min-w-full mx-auto p-3 lg:p-5">
            <ProductSlider />
          </div>
        </div>
  
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
          {products.map((product, index) => {
            return <Products product={product} key={index} />;
          })}
        </div>
      </div>
        )}
      </section>
   
      
      </>

  );
  
}