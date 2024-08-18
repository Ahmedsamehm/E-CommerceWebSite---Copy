import React, { useContext, useState,  } from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { AuthContext } from '../../Context/AuthContext';

export default function Login () {
  const [isLoading, setIsLoading] = useState(false)
  /**
   * this isLoading at the start is F go to function api
   *
   *
   */
  const [SuccessMgs, getSuccessMgs] = useState('')
  const [ErrMessage, setErrMessage] = useState('')
  const navigate = useNavigate()

  
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      onSubmit: login,

      validationSchema: Yup.object({
        email: Yup.string()
          .required('Email is required')
          .email('Enter Valid Email'),
        password: Yup.string()
          .required('Password is required')
          .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            'Password must be at least 8 characters long and contain at least one uppercase '
          )
      })
    })
  
  
   let {setUserToken}=  useContext(AuthContext)

  

  
  
  async function login () {
    //api   function

    /*
    here we make  setLoading true  cuz we check data come from api 
    
    */
    getSuccessMgs('') // clear message succ/err
    setErrMessage('')
    setIsLoading(true)
    await axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({ data }) => {
        // after check we make it again false cuz we done
        setIsLoading(false)
        setUserToken(data.token)
        localStorage.setItem("token",data.token)
        
        // display message
        getSuccessMgs(data.message)

        setTimeout(() => {
          if (location.pathname == "/Login") {
            navigate("/")
          } else {
            navigate(location.pathname)
          }
         
        }, 2000)
      })
      .catch(err => {
        setIsLoading(false)

        setErrMessage(err.response.data.message)
      })
  }

  return (
    <section id="Login">
 <form
      className='flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0'
      onSubmit={handleSubmit}
    >
      <div className='text-center space-y-1 pt-10'>
        <h1 className='text-center text-3xl'>Welcome to FreshCart</h1>
        <h3>LoginPage</h3>
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='email1' value='Your email' />
        </div>
        <TextInput
          onBlur={handleBlur}
          id='email1'
          value={values.email}
          name='email'
          onChange={handleChange}
          type='email'
          placeholder='name@flowbite.com'
        />
        <div>
          {touched.email && errors.email && (
            <p className='text-red-600 '>{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password1' value='Your password' />
        </div>
        <TextInput
          onBlur={handleBlur}
          id='password1'
          value={values.password}
          name='password'
          onChange={handleChange}
          type='password'
        />
        <div>
          {touched.password && errors.password && (
            <p className='text-red-600 '>{errors.password}</p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-2'>

      <Link className='cursor-default' to='/ForgetPassword'>
         ForgetPassword ?
          <span className='cursor-pointer text-blue-500 hover:text-blue-700 ps-2 '>
             RestPassword
          </span>
        </Link>
      </div>
      <Button
        className='disabled:bg-gray-500'
        type='submit '
        disabled={isLoading}
      >
        Login {isLoading && <i className='fa-solid fa-spinner '></i>}
      </Button>
      <div className='text-center'>
        <p className='text-red-500'>{ErrMessage}</p>
        <p className='text-green-600'>{SuccessMgs}</p>
      </div>
      <div>
        <Link className='cursor-default' to='/Register'>
          you don't have Account ?
          <span className='cursor-pointer text-blue-500 hover:text-blue-700 '>
            Register
          </span>
        </Link>
      </div>
    </form>
    </section>
   
  )
}
