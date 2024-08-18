
import './App.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Carts from './Components/Carts/Carts'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import CounterContextProvider from './Context/Context'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoute from './Components/ProtectedAuthRoute/ProtectedAuthRoute'
import ProductsPage from './Components/ProductsPage/ProductsPage'
import ProductsContext from './Context/ProductsContext'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import AddressesForm from './Components/AddressesForm/AddressesForm'
import Orders from './Components/Orders/Orders'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import RestPasswordPage from './Components/RestPasswordPage/RestPasswordPage'
import WishList from './Components/WishList/WishList'


function App() {

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'ProductsPage', element: <ProtectedRoute><ProductsPage /></ProtectedRoute> },
        { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'Carts', element: <ProtectedRoute><Carts /></ProtectedRoute> },
        { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'WishList/:id?', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'ForgetPassword', element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute> },
        { path: 'AddressesForm/:cartId', element: <ProtectedRoute><AddressesForm /></ProtectedRoute> },
        { path: 'ProductDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders/></ProtectedRoute> },
        { path: 'RestPasswordPage', element: <ProtectedAuthRoute><RestPasswordPage/></ProtectedAuthRoute> },
        { path: 'Register', element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: 'Login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },

        { path: '*', element: <NotFoundPage /> }
      ]
    }
  ])

  return (
    <>
      {/* u can make this context inside context like  this  */}
      <ProductsContext>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </CounterContextProvider>

        </AuthContextProvider>
      </ProductsContext>
      <ToastContainer />

    </>
  )
}

export default App
