import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default async function AddToCart(productId,UserToken) {

   
    const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: productId,

    }, {
      headers: {
        token:UserToken 
      }
    })
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
  }
