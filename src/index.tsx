import React from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import ToastContainerProps from './utils/toastContainerProps';
import './theme/main.scss';

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <>
    <ToastContainer {...ToastContainerProps} theme="dark" />
    <App />
  </>
);
