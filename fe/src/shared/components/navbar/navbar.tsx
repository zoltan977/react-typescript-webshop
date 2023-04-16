import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logout as authLogout } from '../../../auth/services/auth.service';
import { routes } from '../../constants/routes';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import classes from './navbar.module.scss';
import { useSelector } from 'react-redux';
import { getShoppingCart } from '../../../shopping/store/selectors';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useCurrentUser();
  const shoppingCart = useSelector(getShoppingCart);

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
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Webshop
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