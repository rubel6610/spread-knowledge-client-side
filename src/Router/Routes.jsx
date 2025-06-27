import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";
import Login from "../Components/Login";
import Register from "../Components/Register";
import PostArticle from "../Pages/PostArticle";
import AllArticles from "../Pages/AllArticles";
import MyArticles from "../Pages/MyArticles";
import PrivateRoutes from "./PrivateRoutes";
import ArticleDetails from "../Pages/ArticleDetails";
import Category from "../Pages/Category";
import NotFound from "../Components/NotFound";
import Home from "../Pages/Home";
import AboutUs from "../Pages/AboutUs";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index:true,
        element:<Home/>,
      },
      { path: "/all-articles", element: <AllArticles /> },
      { path: "/all-articles/:id", element: <ArticleDetails /> },
      { path: "/my-articles", element: <PrivateRoutes><MyArticles /></PrivateRoutes> },
      { path: "/post-article", element: <PrivateRoutes><PostArticle /></PrivateRoutes> },
      { path: "/category/:category", element: <Category /> },
      { path: "/about", element: <AboutUs /> }

    ]
  },
  
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> }
]);
