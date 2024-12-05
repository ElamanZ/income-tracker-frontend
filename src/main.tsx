import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import dayjs from 'dayjs';
import "dayjs/locale/ru";
import './index.css'
import '@mantine/charts/styles.css';

dayjs.locale("ru");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
