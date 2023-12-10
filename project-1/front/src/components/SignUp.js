import React, { useState, useEffect } from 'react'
import { Formik, Form as FormikForm } from 'formik'
import * as Yup from "yup";
import Input from './common/formComponent/input'
import RegisterServices from '../services/registerServices'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const onSubmit = (fields, { resetFrom }) => {
        RegisterServices.signUp({
            name: fields.name,
            email: fields.email,
            password: fields.password
        }).then((response) => {
            if (response?.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
            }
        }).catch((error) => {
            // console.log(error)
        })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, []);

    return (
        <div className='register'>
            <h1>Register Page</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors }) => {

                    return (
                        <FormikForm>
                            <Input className={"inputBox"} name={"name"} placeholder='Enter Name' />
                            <Input className={"inputBox"} name={"email"} placeholder='Enter Email' />
                            <Input className={"inputBox"} type="password" name={"password"} placeholder='Enter Password' />
                            <button className='appButton' type='submit'>Sign Up</button>
                        </FormikForm>
                    )
                }}
            </Formik>

        </div>
    )
}

export default SignUp
