import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AddToCart from "../AddToCart";
import { ProductsContext } from "../../Context/ProductsContext";
import Loading from "../loading/Loading";
import { Bounce, toast } from "react-toastify";

export default function WishList() {
  const { UserToken } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(ProductsContext);
  const [wishlist, setWishlist] = useState([]);
  const [removingItemId, setRemovingItemId] = useState();

  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: UserToken,
        },
      }
    );

    setWishlist(data.data);
  }

  async function removeFromWishlist(id) {
    setRemovingItemId(id);
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: UserToken,
        },
      }
    );
    toast.success(data.message, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    getWishList();
    setRemovingItemId();
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) :  (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Wishlist
          </h2>
          <div className="space-y-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <img
                      src={item.imageCover || item.image}
                      alt={item.title || item.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="md:w-2/4 p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                      {item.title || item.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item.description ||
                        "Product description not available"}
                    </p>
                    <p className="text-xl font-bold text-blue-600 mb-4">
                      Price: ${item.price}
                    </p>
                  </div>
                  <div className="md:w-1/4 p-6 flex flex-col justify-center items-center space-y-4">
                    <button
                      onClick={() => {
                        AddToCart(item?._id, UserToken);
                      }}
                      className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 w-full"
                    >
                      Add to Cart
                    </button>
                    <button
                      disabled={removingItemId === item._id}
                      onClick={() => removeFromWishlist(item._id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 w-full disabled:bg-gray-400 disabled:text-gray-500"
                    >
                      {removingItemId === item._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
              
            )
            ) }
              
           
            </div>
        </div>
        
      )}
    </>
  );
}