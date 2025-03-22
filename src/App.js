import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Form from './Components/Form/Form.jsx';
import Login from './Components/Login/Login.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import ProtectedRoute from './Components/Context/ProtectedRoute.js';
import Logout from './Components/Context/Logout.js';
import NotFound from './Components/NotFound/NotFound.jsx';

export default function App() {

  let routers = createBrowserRouter([
    {index: true ,element: <Form />},
    {path: 'login' ,element: <Logout><Login /></Logout>},
    {path: 'dashboard' ,element: <ProtectedRoute><Dashboard /></ProtectedRoute>},
    {path: '*' ,element: <NotFound />}
  ])


  return <>
    <Helmet>
      <title>Levels Derm Clinic</title>
      <meta name="description" content="This is my custom website description" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/levels_derm_logo.png" />
      <link rel="apple-touch-icon" href="/levels_derm_logo.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
    <RouterProvider router={routers}>j</RouterProvider>
  </>
}