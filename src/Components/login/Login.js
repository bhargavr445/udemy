import React, { use, useEffect, useRef } from 'react';
import classes from './Login-module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserProfileContext } from '../../Context/userProfileContext';
import { useDebounce } from '../../hooks/useDebounce';

function Login() {



    const timerRef = useRef(null);
    const isPasswordError = useRef(true);
    const { setUserProfileFromApi } = use(UserProfileContext);

    const initialValues = {
        userName: 'bhargavrg445',
        password: 'test@123',
    };

    const checkPassword = (passwordValue) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            isPasswordError.current = false;
            try {
                
            } catch (error) {
                
            }
        }, 300);

        return isPasswordError.current;
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('This is a required field'),
        password: Yup.string()
            .required('This is a required field')
            //.test('password_custom', 'Invalid Password Custom', (value) => checkPassword(value))
    });

    const onSubmit = (values) => {
        console.log(values);
        values.resetForm();
        // login(values);
    }

    async function login(values) {
        try {
            const response = await axios.post('http://localhost:3010/api/login', values);
            const { userName, role } = response.data.data.user;
            setUserProfileFromApi({ userName, role })
            sessionStorage.setItem('TOKEN',response.data.data.token);
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <div className={classes.login_main}>
            <div className={classes.login_container}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} >
                    {(form) => (
                        <Form onSubmit={() => onSubmit(form)}>
                            <div>
                                <label>User Name:</label>
                                <Field
                                    type="userName"
                                    id="userName"
                                    name="userName"
                                    placeholder="Enter your User Name" />

                                <ErrorMessage
                                    name="userName"
                                    component="div"
                                    style={{ color: 'red', marginTop: '5px' }}
                                />
                            </div>

                            <div>
                                <label>Password:</label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your Password" />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    style={{ color: 'red', marginTop: '5px' }}
                                />
                            </div>
                        {JSON.stringify(form)}
                            <button type='submit'>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login;