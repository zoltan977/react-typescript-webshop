import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';
import Navbar from './shared/components/navbar/navbar';
import { routes } from './shared/constants/routes';
import Products from './shopping/components/products/products';

const defaultMaterialTheme = createTheme();

function App() {
  
  return (
    <div className={classes.component}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Navbar/>
        <Routes>
          <Route path={routes.home} element={<Products />} />
          <Route path="*" element={<Navigate to={routes.home}/>} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
