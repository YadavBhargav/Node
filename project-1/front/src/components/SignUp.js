import React, { useState } from 'react'
import { Formik, Form as FormikForm } from 'formik'
import Input from './common/formComponent/input'
const SignUp = () => {
    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const onSubmit = (fields, { resetFrom }) => {
        console.log(fields)
    }

    return (
        <div className='register'>
            <h1>Register Page</h1>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {({ }) => {
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
