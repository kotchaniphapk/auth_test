import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter, RouterProvider,
} from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";


import { store } from "./reducers";
import ErrorPage from "./ErrorPage.jsx";

import Login from "./containers/Login/Login.jsx";
import Register from "./containers/Register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);


function Main() {
  return (
    <NextUIProvider locale="en-GB">
       <Provider store={store}>
        <IconContext.Provider value={{ className: "react-icons", size: 20, style: { opacity: 0.8 } }}>
          <RouterProvider router={router} />
        </IconContext.Provider>
        </Provider>
    </NextUIProvider>
  );
}
export default Main

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
