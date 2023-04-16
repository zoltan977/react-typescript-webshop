import 'animate.css/animate.min.css';
import classes from './navbar.module.scss';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import classnames from 'classnames';
import { useEffect, useState, AnimationEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { logout as authLogout } from '../../../auth/services/auth.service';
import { getShoppingCart } from '../../../shopping/store/selectors';
import { routes } from '../../constants/routes';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const mapRouteToPageTitle: Record<string, string> = {
  '/login': 'Belépés',
  '/signup': 'Regisztráció',
  '/cart': 'Bevásárló kosár',
  '/check-out': 'Megrendelés',
  '/my/orders': 'Megrendeléseim',
  '/user-account': 'Fiókom',
  '/admin/orders': 'Összes megrendelés',
  '/admin/orders/order-details': 'Megrendelés részletei',
  '/my/orders/order-details': 'Megrendelés részletei',
  '/admin/products': 'Összes termék',
  '/admin/products/product-details': 'Termék szerkesztése',
  '/admin/products/product-details/new': 'Termék hozzáadása',
}

const getPageTitleFromRoute = (path: string): string => {
  let title = "Home";
  for (const route in mapRouteToPageTitle) {
    if(path.includes(route)) {
      title = mapRouteToPageTitle[route]
    }
  }
  return title;
}

export default function Navbar() {
  const pathname = useLocation().pathname;
  const [prevPathname, setPrevPathname] = useState("");
  const [titleAnimationState, setTitleAnimationState] = useState("")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useCurrentUser();
  const shoppingCart = useSelector(getShoppingCart);


  const onTitleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.animationName.includes("Out")) {
      setPrevPathname(pathname);
      setTitleAnimationState("flyIn");
    } else {
      setTitleAnimationState("");
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    authLogout();
    handleClose();
  }

  useEffect(() => {
    if (!prevPathname) {
      setPrevPathname(pathname);
    } else if (prevPathname !== pathname) {
      setTitleAnimationState("flyOut");
    }
  }, [pathname])
  

  return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            component={Link}
            to={routes.home}
            color="inherit"
            aria-label="menu"
            sx={{ padding: 0 }}
          >
            <HomeIcon sx={{fontSize: 50}} />
          </IconButton>
          {
            currentUser ? <MenuItem 
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{color: 'black'}}>
                {currentUser.user.username}
            </MenuItem> : <MenuItem 
              sx={{color: 'black'}} 
              component={Link} 
              to={routes.login}>
                Belépés
            </MenuItem>
          }
          <Typography 
            onAnimationEnd={onTitleAnimationEnd}
            className={classnames({
              ["animate__animated"]: !!titleAnimationState,
              ["animate__faster"]: !!titleAnimationState,
              [`animate__bounceInRight`]: titleAnimationState === "flyIn",
              [`animate__bounceOutLeft`]: titleAnimationState === "flyOut",
            })}
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              {getPageTitleFromRoute(prevPathname)}
          </Typography>
          <IconButton
            component={Link}
            to={routes.cart}
            sx={{padding: 1}}
            aria-label="shopping cart"
            color="inherit"
          >
            <Badge badgeContent={shoppingCart.itemCount} color="secondary">
              <ShoppingCartIcon sx={{fontSize: 40, color: 'black'}} />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem 
              component={Link}
              to={routes.userAccount}
              onClick={handleClose}>
                Fiókom
            </MenuItem>
            <MenuItem 
              component={Link}
              to={routes.myOrders}
              onClick={handleClose}>
                Megrendeléseim
            </MenuItem>
            {currentUser?.user.admin && <div className={classes.adminMenuItems}>
                <MenuItem 
                  component={Link}
                  to={routes.adminOrders}
                  onClick={handleClose}>
                    Összes megrendelés
                </MenuItem>
                <MenuItem 
                  component={Link}
                  to={routes.adminProducts}
                  onClick={handleClose}>
                    Összes termék
                </MenuItem>
              </div>
            }
            <MenuItem onClick={logout}>Kilépés</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  );
}