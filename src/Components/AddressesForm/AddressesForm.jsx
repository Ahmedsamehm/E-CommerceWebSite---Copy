import React, { useContext, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContext } from "../../Context/AuthContext";

export default function AddressesForm() {
    const { cartId } = useParams()

    
    const { UserToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    /**
     * this isLoading at the start is F go to function api
     *
     *
     */

    const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
        useFormik({
            initialValues: {
                details: "details",
                phone: "01010700999",
                city: "Cairo",
            },
            onSubmit: login,

            validationSchema: Yup.object({
                details: Yup.string()
                    .required("details is required"),
                    phone: Yup.string()
                    .required("phone is required"),
                city: Yup.string()
                    .required("city is required"),
            }),
        });
    let { setUserToken } = useContext(AuthContext);
    async function login() {
        //api   function

        /*
        here we make  setLoading true  cuz we check data come from api 
        
        */

        setIsLoading(true);
        await axios
            .post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId, { shippingAddress: values }, {
                headers: {
                    token: UserToken,
                }, params:{
                    url:'http://localhost:5173'
                },
            })
            .then(({ data }) => {
                setIsLoading(false);

                location.href=data.session.url
            })
           

            ;
    }

    return (
        <section id="AddressesForm">
 <form
            className="flex max-w-md flex-col gap-4 mx-auto pt-10 px-10 lg:px-0"
            onSubmit={handleSubmit}
        >
            <div className="text-center space-y-1 pt-10">
                <h1 className="text-center text-3xl">Add Your Shaping Address</h1>

            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="details" value="Your details" />
                </div>
                <TextInput
                    onBlur={handleBlur}
                    id="details"
                    value={values.details}
                    name="details"
                    onChange={handleChange}
                    type="details"
                
                />
                <div>
                    {touched.details && errors.details && (
                        <p className="text-red-600 ">{errors.details}</p>
                    )}
                </div>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="phone" value="Your phone" />
                </div>
                <TextInput
                    onBlur={handleBlur}
                    id="phone"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    type="tel"
                />
                <div>
                    {touched.phone && errors.phone && (
                        <p className="text-red-600 ">{errors.phone}</p>
                    )}
                </div>
            </div>  
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="city" value="Your city" />
                </div>
                <TextInput
                    onBlur={handleBlur}
                    id="city"
                    value={values.city}
                    name="city"
                    onChange={handleChange}
                    type="text"
                />
                <div>
                    {touched.city && errors.city && (
                        <p className="text-red-600 ">{errors.city}</p>
                    )}
                </div>
            </div>  
            <Button
                className="disabled:bg-gray-500"
                type="submit "
                disabled={isLoading}
            >
                CheckOut  {isLoading && <i className="fa-solid fa-spinner "></i>}
            </Button>

        </form>

        </section>
       
    );
}
