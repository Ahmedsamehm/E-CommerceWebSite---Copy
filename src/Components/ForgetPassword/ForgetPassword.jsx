import React, { useContext, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { setUserToken } = useContext(AuthContext);
  const [formStatus, setFormStatus] = useState("email");
  const navigate = useNavigate();

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter a valid email")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must be a valid email"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values);
        if (data.statusMsg === "success") {
          setFormStatus("code");
          toast.success("Reset code sent to your email");
        }
      } catch (error) {
        setErrMsg(error.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const codeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required("Code is required")
        .matches(/^[0-9]{5,6}$/, "Must be a valid code"),
    }),
    onSubmit: verifyResetCode,
  });

  async function verifyResetCode(values) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
      if (data.status === "Success") {
        toast.success("Reset code verified");
        navigate("/RestPasswordPage");
      }
    } catch (error) {
      toast.error("Invalid reset code");

    }
  }

  return (
    <>
      <section id="ForgetPassword">
      {formStatus === "email" ? (
        <form 
          className="flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0"
          onSubmit={emailFormik.handleSubmit}
        >
          <div className="text-center space-y-1 pt-10">
            <h1 className="text-center text-3xl">Forgot Password</h1>
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
              value={emailFormik.values.email}
              onChange={emailFormik.handleChange}
              onBlur={emailFormik.handleBlur}
            />
            <div>
              {emailFormik.touched.email && emailFormik.errors.email && (
                <p className="text-red-600">{emailFormik.errors.email}</p>
              )}
              {errMsg && <p className="text-red-600">{errMsg}</p>}
            </div>
          </div>
          <Button
            className="disabled:bg-gray-500"
            type="submit"
            disabled={isLoading}
          >
            Send {isLoading && <i className="fa-solid fa-spinner fa-spin ml-2"></i>}
          </Button>
        </form>
      ) : (
        <form 
          className="flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0"
          onSubmit={codeFormik.handleSubmit}
        >
          <div className="text-center space-y-1 pt-10">
            <h1 className="text-center text-3xl">Enter Reset Code</h1>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="resetCode" value="Reset Code" />
            </div>
            <TextInput
              id="resetCode"
              name="resetCode"
              type="text"
              value={codeFormik.values.resetCode}
              onChange={codeFormik.handleChange}
              onBlur={codeFormik.handleBlur}
            />
            <div>
              {codeFormik.touched.resetCode && codeFormik.errors.resetCode && (
                <p className="text-red-600">{codeFormik.errors.resetCode}</p>
              )}
              {errMsg && <p className="text-red-600">{errMsg}</p>}
            </div>
          </div>
          <Button
            className="disabled:bg-gray-500"
            type="submit"
            disabled={isLoading}
          >
            Verify {isLoading && <i className="fa-solid fa-spinner fa-spin ml-2"></i>}
          </Button>
        </form>
      )}
      </section>
     
    </>
  );
}