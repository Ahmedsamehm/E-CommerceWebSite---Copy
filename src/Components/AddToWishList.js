import axios from 'axios'
import React from 'react'
import { Bounce, toast } from 'react-toastify';
import Loading from './loading/Loading';

export default async function AddToWishList(productId, UserToken) {
    try {
        const { data } = await axios.post(
          
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: productId },
        {
          headers: {
            token: UserToken
          }
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

    } catch (error) {
        toast.error(error.message, {
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
  }