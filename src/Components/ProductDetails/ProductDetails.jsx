import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingProducts from "../RatingProducts/RatingProducts";
import Loading from "../loading/Loading";
import { ProductsContext } from "../../Context/ProductsContext";
import DetailsSlider from "../DetailsSlider/DetailsSlider";
import AddToCart from "../AddToCart";
import { AuthContext } from "../../Context/AuthContext";
import AddToWishList from "../AddToWishList";

export default function ProductDetails() {
  let { id } = useParams();

  const [ProductDetails, setProductDetails] = useState(null);
  const { isLoading, setIsLoading } = useContext(ProductsContext);
  const {UserToken}=useContext(AuthContext)
  
  useEffect(() => {
    GetProductDetails();
  }, []);

  async function GetProductDetails() {
    setIsLoading(true)
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
    setIsLoading(false)
    


  }

  return (
    <>
      <section id="ProductDetails">
      {
        isLoading ? <Loading /> :
        <div className="bg-gray-100 my-5 p-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 ">
              <img
                src={ProductDetails?.imageCover }
                alt="Product"
                className="md:w-5/6 lg:w-96 mx-auto rounded-lg shadow-md mb-4"
                id="mainImage"
                  />
                  <div className="lg:w-full  mx-auto">
                  <DetailsSlider images={ProductDetails?.images} />
                  </div>
               
            </div>


            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">
                {ProductDetails?.title }
              </h2>
              <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">${ProductDetails?.price }</span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>
              <div className="flex items-center mb-4 ">
                  <RatingProducts rating={ProductDetails?.ratingsAverage} />
                <span className="ml-2 text-gray-600 "> ({ProductDetails?.ratingsQuantity} reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">
                {ProductDetails?.description }
              </p>
         
              <div className="flex space-x-4 mb-6">
                <button onClick={()=>AddToCart(ProductDetails._id,UserToken)} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button onClick={()=>AddToWishList(ProductDetails._id,UserToken)} className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Wishlist
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">More Details</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>{ProductDetails?.brand.name }</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </section>
    
     
    </>
  );
}
