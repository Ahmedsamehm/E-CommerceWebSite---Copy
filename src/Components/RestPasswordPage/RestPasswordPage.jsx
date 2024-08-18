import axios from 'axios'
import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Label, TextInput, Button } from 'flowbite-react'; // افترضت أنك تستخدم Flowbite React
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Enter Valid Email'),
      newPassword: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
    }),
    onSubmit: resetPassword,
  });

  async function resetPassword(values) {
    setIsLoading(true);
    setErrMsg('');
    try {
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
      if (data.token) {
        toast.success("Password reset successfully");
        console.log(data.token);
        navigate("/Login");
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "An error occurred");
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section id="RestPasswordPage">
      <form 
        className="flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0"
        onSubmit={formik.handleSubmit}
      >
        <div className="text-center space-y-1 pt-10">
          <h1 className="text-center text-3xl">Reset Password</h1>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600">{formik.errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="newPassword" value="New Password" />
          </div>
          <TextInput
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-600">{formik.errors.newPassword}</p>
            )}
          </div>
        </div>
        {errMsg && <p className="text-red-600">{errMsg}</p>}
        <Button
          className="disabled:bg-gray-500"
          type="submit"
          disabled={isLoading}
        >
          Reset Password {isLoading && <i className="fa-solid fa-spinner fa-spin ml-2"></i>}
        </Button>
      </form>
      </section>
  
    </>
  )
}