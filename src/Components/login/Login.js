import React, {use} from 'react';
import classes from './Login-module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserProfileContext } from '../../Context/userProfileContext';

function Login() {

    const { setUserProfileFromApi } = use(UserProfileContext);    

    const initialValues = {
        userName: 'bhargavrg445',
        password: 'test@123',
    };

    const checkPassword = (passwordValue) => {
        return false;
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('This is a required field'),
        password: Yup.string()
        .required('This is a required field')
        .test('password_custom','Invalid Password Custom', (value) => checkPassword(value))
    });

    const onSubmit = (values) => {
        login(values);
    }
    // const navigate = useNavigate();

    async function login(values) {
        try {
            const response = await axios.post('http://localhost:3010/api/login', values);
            console.log(response);
            const {userName, role} = response.data.data.user;
            setUserProfileFromApi({userName, role})
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={classes.login_main}>
            <div className={classes.login_container}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {() => (
                        <Form>
                            <div>
                                <label>User Name:</label>
                                <Field
                                    type="userName"
                                    id="userName"
                                    name="userName"
                                    placeholder="Enter your User Name"/>

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

                            <button type='submit'>Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login