import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'
import AuthProvider from './Provider/AuthProvider'



createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
 
)
