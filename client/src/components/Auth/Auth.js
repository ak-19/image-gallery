import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Button, createTheme, Typography, Grid, Avatar, Container, ThemeProvider, CssBaseline, Box } from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

import { signIn, signUp } from '../../actions/auth';

import Input from "../Input";

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, history))
    }
    else {
      dispatch(signIn(formData, history))
    }

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleShowPassword = (e) => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setSignUp(!isSignUp);
    setShowPassword(false);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">{isSignUp ? "Signup" : "Sign in"}</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {isSignUp && (<>
                <Grid item xs={12} sm={6}>
                  <Input name="firstName" label="First Name" handleChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <Input name="lastName" label="Last Name" handleChange={handleChange} />
                </Grid>
              </>
              )}
              <Grid item xs={12} sm={12}>
                <Input name="email" label="Email" type="email" handleChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
              </Grid>

              {isSignUp && (
                <Grid item xs={12} sm={12}><Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} /></Grid>
              )}
            </Grid>
            <Button type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>{isSignUp ? "Have already account, login" : "Do not have account, sign in"}</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Auth;
