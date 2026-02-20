import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';


export default function Create() {

  const timerRef = useRef(null);
  const isCourseIdExists = useRef(true);


  const initialValues = {
    course_id: '',
    title: '',
    description: '',
    price: null,
    categoryType: ''
  }

  async function checkIfCourseIdExists(courseId) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      // isCourseIdExists.current = false;
      try {
        const response = await axios.get(`http://localhost:3010/api/checkIdExists/${courseId}`);
        console.log(response.data.data);

        isCourseIdExists.current = !response.data.data;

        // resolve(false)

      } catch (error) {

      }
    }, 300);
    let resp = isCourseIdExists.current;
    console.log(resp);

    return resp;
  }

  const validationSchema = Yup.object({

    course_id: Yup.string()
      .required('This is a required field')
      .test('duplicate_course_id', 'This Course ID already exists', (value) => checkIfCourseIdExists(value)),

    title: Yup.string().required('This is a required field'),

    description: Yup.string().required('This is a required field'),

    price: Yup.number()
      .required('This is a required field'),

    categoryType: Yup.string().required('This is a required field')
  })

  const onSubmit = (values) => {
    console.log(values);
    // login(values);
  }


  return (
    <>
      <div >
        <div>
          <Formik 
            initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}>
            {() => (
              <Form>
                <div>
                  <label>Course Id:</label>
                  <Field
                    type="text"
                    id="course_id"
                    name="course_id"
                    placeholder="Enter your Course Id" />

                  <ErrorMessage
                    name="course_id"
                    component="div"
                    style={{ color: 'red', marginTop: '5px' }}
                  />
                </div>

                <div>
                  <label>Title:</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter your title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: 'red', marginTop: '5px' }}
                  />
                </div>

                <div>
                  <label>Description:</label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter your description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: 'red', marginTop: '5px' }}
                  />
                </div>

                <div>
                  <label>Price:</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter your price" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    style={{ color: 'red', marginTop: '5px' }}
                  />
                </div>

                <div>
                  <label>Category Type:</label>
                  <Field
                    type="text"
                    id="categoryType"
                    name="categoryType"
                    placeholder="Enter your categoryType" />
                  <ErrorMessage
                    name="categoryType"
                    component="div"
                    style={{ color: 'red', marginTop: '5px' }}
                  />
                </div>

                <button type='submit'>Create</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
