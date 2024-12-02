import React, { useState } from 'react';
import classes from './Login-module.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Login() {

    // const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
       const response =  await axios.post('http://localhost:3010/api/login', {userName, password});
       if(response.status !== 200) {
        throw Error('Login failed');
       }
    //    navigate('/vehicle');
    }

  return (
      <div className={classes.login_main}>
          <div className={classes.login_container}>
              <form>

                  <div className={classes.form_group}>
                      <label htmlFor='username'>User Name:</label>
                      <input type="text" id="username" placeholder="Enter Username" onChange={(e) => setUserName(e.target.value)} />
                  </div>


                  <div className={classes.form_group} id="password-sec">
                      <label htmlFor="password">Password</label>
                      <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/>
                  </div>


                  <button onClick={login}>Login</button>
              </form>
          </div>
      </div>
  )
}

export default Login