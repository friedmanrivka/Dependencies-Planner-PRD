import './BasicTable.css';
import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { checkEmailExists } from './services';
import appsflyerLogo from '../images/appsflyerLogo.png'
import logoapp from '../images/logoapp.png'

const theme = createTheme();

const EmailCheckPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    try {
      const { exists, isAdmin } = await checkEmailExists(email);
      if (exists) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isAdmin', isAdmin.toString());
        navigate('/table');
      } else {
        setErrorMessage('Email not found');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setErrorMessage('Error checking email');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In Product Manager
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#58D64D', 
                    },
                    '&:hover fieldset': {
                      borderColor: '#58D64D', 
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#58D64D', 
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#00C2FF', '&:hover': { backgroundColor: '#00A9E0' } }}
              >
                Check Email
              </Button>
              {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <img
                  src={appsflyerLogo}
                  alt="Appsflyer Logo"
                  style={{
                    width: '300px',
                    height: 'auto',
                    marginTop: '100px',
                    marginRight: '50px'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <img
              src={logoapp}
              alt="logoapp Logo"
              style={{
                width: 'auto',
                height: '100%',
                marginTop: '15%',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EmailCheckPage;
