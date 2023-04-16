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

const defaultMaterialTheme = createTheme();

function App() {
  const dispatch = useDispatch();
  
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
          <Route path="*" element={<Navigate to={routes.home}/>} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
