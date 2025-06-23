import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Navbar from "../Components/Navbar";
import PostArticle from "../Pages/PostArticle";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:Root,
    },
    {
        path:"/login",
        element:<>
        <Navbar></Navbar>
        <Login/>
        </>,
    },
    {
        path:"/register",
        Component:Register,
    },
    {
        path:"/my-articles",
        
    },
    {
        path:"/post-article",
        element:<PostArticle/>
    }
])