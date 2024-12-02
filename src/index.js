import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defineCustomElements } from 'bhargav-uc-components/loader';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  console.log(config);
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`;
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

defineCustomElements(window)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
