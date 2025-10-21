import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Routes'
import AuthProvider from './Provider/AuthProvider'
import SocketProvider from './Provider/SocketProvider'



createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SocketProvider>
      <RouterProvider router={router}></RouterProvider>
    </SocketProvider>
  </AuthProvider>
 
)
