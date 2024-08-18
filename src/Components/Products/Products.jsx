import React, { useContext, useEffect } from "react";
import RatingProducts from "../RatingProducts/RatingProducts";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../Context/ProductsContext";
import Loading from "../loading/Loading";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import AddToCart from "../AddToCart";
import WishList from "../WishList/WishList";
import AddToWishList from "../AddToWishList";

export default function Products({ product }) {
  const { isLoading } = useContext(ProductsContext);

  const { UserToken } = useContext(AuthContext);

  return (
    <>
      <section id="Products" className="py-8">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
              <Link
                to={"/ProductDetails/" + product._id}
                className="block relative"
              >
                <img
                  className="w-full h-64 object-cover object-center transition duration-300 hover:opacity-80"
                  src={product.imageCover}
                  alt={product.title}
                />
              </Link>
              <div className="p-6">
                <Link to={"/ProductDetails/" + product._id}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 hover:text-blue-600 transition duration-300 ">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mb-4">
                  <RatingProducts rating={product.ratingsAverage} />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <div
                    onClick={() => AddToWishList(product._id, UserToken)}
                    className=" top-4 right-4 block dark:bg-gray-800 rounded-full p-2 cursor-pointer"
                  >
                    <i className="fa-regular fa-heart text-gray-500 hover:text-red-500 transition-all duration-300 text-xl "></i>
                  </div>
                </div>
                <button
                  onClick={() => AddToCart(product._id, UserToken)}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
