import React, { useState, useEffect } from 'react';
import { IconButton, CssBaseline, AppBar, Typography, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PhotoCamera } from '@mui/icons-material';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history('/auth');
    setUser(null);
  };

  const addNewImage = () => {
    history('/addimage');
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'none', md: 'block' }, }}
          >
            <PhotoCamera />
          </IconButton>
          <Typography
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}>
            My image gallery
          </Typography>
          {user?.result ? (
            <>
              <Button variant="outlines" sx={{ margin: '0 15px' }} onClick={addNewImage}>Add new image</Button>
              <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
            </>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;