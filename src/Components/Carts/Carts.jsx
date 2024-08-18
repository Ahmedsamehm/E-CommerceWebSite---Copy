import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ProductsContext } from "../../Context/ProductsContext";
import Loading from "../loading/Loading";
import { Bounce, toast } from "react-toastify";
import { stringify } from "postcss";
import CartProducts from "../cartProducts/CartProducts";
import { Link } from "react-router-dom";

export default function Carts() {
  const { UserToken } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(ProductsContext);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    GetCartDetails();
  }, []);
  async function GetCartDetails() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: UserToken,
        },
      }
    );
    setCart(data);
    setIsLoading(false);
  }
  async function ClearCart() {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: UserToken,
      },
    
    })
    setCart(null)
  }

  return (
    <>
      <section id="cart">
      {isLoading ?
      (
      <Loading />
    ) : (
      cart? <div className="font-[sans-serif] bg-white h-full">
        <div className="max-w-7xl max-lg:max-w-3xl mx-auto p-6">
          <h2 className="text-3xl font-extrabold text-gray-800 ">
            Your Cart
          </h2>
          <div className="grid lg:grid-cols-3 gap-6 relative mt-8">
            <div className="lg:col-span-2 space-y-6">
              {cart?.data.products.map((item, index) => {
                return (
                  <CartProducts
                    key={index}
                    item={item}
                    cart={cart}
                    setCart={setCart}
                    UserToken={UserToken}
                  />
                );
              })}
            </div>
            <div className="col-span-1">
              <div className="bg-white h-max rounded-md p-4 shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] sticky top-0">
                <h3 className="text-lg font-bold text-gray-800">
                  Order Summary
                </h3>
                <ul className="text-gray-500 text-sm space-y-3 mt-3">
                  <li className="flex flex-wrap gap-4">
                    Subtotal{" "}
                    <span className="ml-auto font-bold">
                      {cart?.data.totalCartPrice}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Shipping <span className="ml-auto font-bold">Free</span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Tax <span className="ml-auto font-bold">$0</span>
                  </li>
                  <li className="flex flex-wrap gap-4 font-bold">
                    Total{" "}
                    <span className="ml-auto">
                      {cart?.data.totalCartPrice}
                    </span>
                  </li>
                </ul>
                <Link
                  to={"/AddressesForm/"+cart?.data._id}
                  className="mt-6 block text-center text-sm px-6 py-3 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white rounded-md"
                >
                  Make Payment
                </Link>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Secure payment
                    </h4>
                    <p className="text-sm text-gray-500">
                      Experience peace of mind with our secure payment
                      options, ensuring your transactions are protected and
                      reliable.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Free delivery
                    </h4>
                    <p className="text-sm text-gray-500">
                      Enjoy the convenience of free delivery on all your
                      orders, providing a cost-effective and seamless shopping
                      experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Easy to return
                    </h4>
                    <p className="text-sm text-gray-500">
                      Simplify your shopping experience with hassle-free
                      returns. Our easy return process ensures convenience and
                      customer satisfaction.
                      </p>
                      <button onClick={() => { ClearCart() }} className="border border-spacing-1 border-red-600 rounded-lg w-full text-center py-2 px-3 my-3 hover:bg-red-600 hover:transition-all hover:text-white">ClearCart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
            : <h1 className="text-center py-10 my-10">Your Cart is empty </h1>
        
    )}
      </section>
 
    </>
  );
}
