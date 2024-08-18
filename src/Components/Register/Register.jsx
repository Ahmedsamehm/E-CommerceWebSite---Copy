import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";


import '@fortawesome/fontawesome-free/css/all.min.css';





export default function Register() {

  const [isLoding, setIsLoding] = useState(false)
  const [ErrMessage, setErrMessage] = useState("")
  const [succsseMsg,setSuccsesMsg]=useState("")
  const navigate =useNavigate()
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
      },
      onSubmit: register,

        validationSchema: Yup.object({
            name: Yup.string().required('Name is required').min(3, "Name must be at least 2 characters long").max(20, "Name must be at most 20 characters long"),
            email: Yup.string().required("Email is required").email("Enter Valid Email"),
            password: Yup.string().required("Password is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Password must be at least 8 characters long and contain at least one uppercase "),
            rePassword: Yup.string().required("Password is required").oneOf([Yup.ref("password")]),
            phone: Yup.string().required("Phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
      })
    });
  async function register() {
    setSuccsesMsg('')

    setErrMessage('')

    setIsLoding(true)
       await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values) 
        .then(({data}) => {
              setIsLoding(false)
          console.log(data.message)
          setSuccsesMsg(data.message)
          setTimeout(() => {
            navigate('/login')
            }, 2000);
          navigate('/login')
        }).catch((err) => {
          setIsLoding(false)
          setErrMessage(err.response.data.message)
          console.log(err.response.data.message)
        }) 
           
     
  }

  return (
    <section id="Register">
         <form
      className="flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl">Welcome to FreshCart</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
         onBlur={handleBlur}

          id="name"
          value={values.name}
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="UserName"
        />
        <div>{touched.name && errors.name &&<p className="text-red-600 ">{errors.name}</p>}</div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
         onBlur={handleBlur}
          id="email1"
          value={values.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="name@flowbite.com"
              />
               <div>{touched.email && errors.email&& <p className="text-red-600 ">{errors.email}</p>}</div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
         onBlur={handleBlur}
          id="password1"
          value={values.password}
          name="password"
          onChange={handleChange}
          type="password"
              />
               <div>{touched.password && errors.password && <p className="text-red-600 ">{errors.password}</p>}</div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword" value="RePassword" />
        </div>
        <TextInput
         onBlur={handleBlur}
          id="rePassword"
          value={values.rePassword}
          name="rePassword"
          onChange={handleChange}
          type="password"
          placeholder=""
              />
              <div>{touched.rePassword && errors.rePassword && <p className="text-red-600 ">{errors.rePassword}</p>}</div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="phone" value="Phone" />
        </div>
        <TextInput
         onBlur={handleBlur}
          id="phone"
          value={values.phone}
          name="phone"
          onChange={handleChange}
          type="tel"
          placeholder=""
              />
              <div>{touched.phone &&  errors.phone &&<p className="text-red-600 ">{errors.phone}</p>}</div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit disabled:bg-gray-500" disabled={isLoding} > Submit {isLoding && <i className="fa-solid fa-spinner "></i>} </Button>
      <div className="text-center">
      <p className="text-red-500">{ErrMessage}</p>
      <p className="text-green-600">{succsseMsg }</p>
      </div>
      <div>
        <Link className="cursor-default" to="/Login">do you  have Account ? <span className="cursor-pointer text-blue-500 hover:text-blue-700  ">Login</span></Link>
      </div>
    </form>
    </section>
 
  );
}
