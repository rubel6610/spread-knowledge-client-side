import { createBrowserRouter } from "react-router";
import Root from "../MainLayout/Root";

export const router = createBrowserRouter([
    {
        path:"/",
        Component:Root,
    }
])