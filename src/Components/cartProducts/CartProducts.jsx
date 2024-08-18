import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function CartProducts({ item, cart, UserToken, setCart }) {
  const [productCount, setProductCount] = useState(item.count);
  const [isLoading, setIsLoading] = useState(false);

  async function DeleteProduct(ID) {
    setIsLoading(true);

      const { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart/" + ID,
        {
          headers: {
            token: UserToken,
          },
        }
      );
      setCart(data);
      toast.success("Delete Success", {
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
      setIsLoading(false);
    
  }

  async function UpdateProduct(ID, count) {
    setIsLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/cart/" + ID,
        {
          count: count,
        },
        {
          headers: {
            token: UserToken,
          },
        }
      );
      setCart(data);
      setIsLoading(false);
    
  }

  useEffect(() => {
    setProductCount(item.count);
  }, [cart]);

  return (
    <>
      <section id="cartProducts">
        <div className="p-2 bg-white shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] rounded-md relative">
          <div className="grid sm:grid-cols-2 items-center gap-4">
            <div className="bg-gradient-to-tr via-gray-100 rounded-md to-gray-50 w-full h-full p-4 shrink-0 text-center">
              <img
                src={item.product.imageCover}
                className="w-56 h-full object-contain inline-block"
                alt={item.product.title}
              />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-bold text-gray-800">
                {item.product.title}
              </h3>
              <ul className="text-sm text-gray-500 space-y-2 list-disc pl-4 mt-3">
                <li>{item.product.brand.name}</li>
                <li>
                  Upper material is made of PU that is comfortable, lightweight,
                  easy to clean.
                </li>
              </ul>
              <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm text-gray-500">Qty:</h4>
                  <button
                    disabled={item.count === 1 || isLoading}
                    onClick={() =>
                      UpdateProduct(item.product._id, item.count - 1)
                    }
                    type="button"
                    className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-2 fill-white"
                      viewBox="0 0 124 124"
                    >
                      <path
                        d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>

                  <input
                    onBlur={() => {
                      item.count !== productCount &&
                        UpdateProduct(item.product._id, productCount);
                    }}
                    onChange={(e) => {
                      setProductCount(e.target.value);
                    }}
                    type="number"
                    className="font-bold text-sm leading-[16px] text-center w-1/2 rounded-full"
                    value={productCount}
                    min="1"
                  />

                  <button
                    disabled={isLoading}
                    onClick={() =>
                      UpdateProduct(item.product._id, item.count + 1)
                    }
                    type="button"
                    className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-2 fill-white"
                      viewBox="0 0 42 42"
                    >
                      <path
                        d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-600">
                    {item.price}
                  </h4>
                </div>
              </div>
              <div className="border-y grid grid-cols-1 text-center mt-6">
                <button
                  disabled={isLoading}
                  onClick={() => DeleteProduct(item.product._id)}
                  type="button"
                  className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm disabled:cursor-not-allowed disabled:text-gray-300"
                >
                  <div>
                    <i className="fa-solid fa-trash px-3" />
                    Remove
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

                  )
   
    

  
}
