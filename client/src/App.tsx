import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Navigation from "./routes/navigation/navigation.component"
import Home from "./routes/home/home.component"
import Auth from "./routes/auth/auth.component"
import Brands from "./routes/brands/brands.component"
import Products from "./routes/products/products.component"

import AddBrand from "./routes/add-brand/add-brand.component"

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { currentUser } from "./store/slices/auth-slice"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {path: "/", element: <Home />},
      {path: "/auth", element: <Auth />},
      {path: "/brands", element: <Brands />},
      {path: "/brands/add", element: <AddBrand />},
      {path: "/products", element: <Products/>}
    ]
  }
])

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(currentUser())
  })

  return <RouterProvider router={router} />
}

export default App
