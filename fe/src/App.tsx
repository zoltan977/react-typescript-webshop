import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';
import Navbar from './shared/components/navbar/navbar';
import { routes } from './shared/constants/routes';
import Products from './shopping/components/products/products';
import Login from './auth/components/login/login';
import Signup from './auth/components/sign-up/signup';
import { useEffect } from 'react';
import { shoppingActions } from './shopping/store/actions';
import {useDispatch} from 'react-redux';
import ShoppingCart from './shopping/components/shopping-cart/shopping-cart';
import { useCurrentUser } from './shared/hooks/useCurrentUser';
import { authActions } from './auth/store/actions';
import Private from './shared/components/routing/private/private';
import UserAccount from './auth/components/user-account/user-account';
import CheckOut from './shopping/components/check-out/check-out';
import OrderList from './shared/components/order-list/order-list';
import OrderDetails from './shared/components/order-list/order-details/order-details';
import Admin from './shared/components/routing/admin/admin';

const defaultMaterialTheme = createTheme();

function App() {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser()
  
  useEffect(() => {
    if (!!currentUser) {
      dispatch(authActions.getUserAccountData())
    } else {
      dispatch(authActions.unSetUserAccountData())
    }
  }, [currentUser])
  
  useEffect(() => {
    dispatch(shoppingActions.getShoppingCart())
  }, [])

  return (
    <div className={classes.component}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Navbar/>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.home} element={<Products />} />
          <Route path={routes.cart} element={<ShoppingCart />} />
          <Route element={<Private />}>
            <Route path={routes.userAccount} element={<UserAccount />} />
            <Route path={routes.checkOut} element={<CheckOut />} />
            <Route path={routes.myOrders} element={<OrderList />} />
            <Route path={routes.myOrderDetails} element={<OrderDetails />} />
          </Route>
          <Route element={<Admin />}>
            <Route path={routes.adminOrders} element={<OrderList />} />
            <Route path={routes.adminOrderDetails} element={<OrderDetails />} />
          </Route>
          <Route path="*" element={<Navigate to={routes.home}/>} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
