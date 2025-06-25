import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Navbar from "../Components/Navbar";
import PostArticle from "../Pages/PostArticle";
import AllArticles from "../Pages/AllArticles";
import MyArticles from "../Pages/MyArticles";
import PrivateRoutes from "./PrivateRoutes";
import ArticleDetails from "../Pages/ArticleDetails";
import Category from "../Pages/Category";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/all-articles",
    element: (
      <>
        <Navbar></Navbar>
        <AllArticles />
      </>
    ),
    
  },
  {
    path: "/all-articles/:id",
    element: <ArticleDetails />,
  },
  {
    path: "/my-articles",
    element: (
      <PrivateRoutes>
        <MyArticles />
      </PrivateRoutes>
    ),
    
  },
  {
    path: "/post-article",
    element: (
      <PrivateRoutes>
        <PostArticle />
      </PrivateRoutes>
    ),
  },
  {
    path:"/category/:category",
    Component:Category,
  }
]);
