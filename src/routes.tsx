import React from "react";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import App from './App'; 
//----------------------------------------------------------------------------------
/**
 * /**
 * @author LinhNC
 * Routes
 */
const routes = [
    {
        path: '/home',
        element: <App />
    },   
    {
        path: '/',
        element:<NotFoundPage />
    }
]
export default routes;