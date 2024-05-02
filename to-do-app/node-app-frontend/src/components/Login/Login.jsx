import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


function Login(){
    const [user, setUser] = useState({
        username: '',
        password: '',
        salt: '',
    });
    
    const handleUsernameChange = (event) => {
        setUser({
            ...user,
            username: event.target.value,
        });
    };
    
    const handlePasswordChange = (event) => {
        setUser({
            ...user,
            password: event.target.value,
        });
    };
    
    const dispatch = useDispatch();
    const defaultTheme = createTheme();
    
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch({ type: 'LOGIN', payload: user });
    }
    
      return (
        <ThemeProvider theme={defaultTheme}>
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username:"
                  name="email"
                  autoComplete="email"
                  onChange={handleUsernameChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password:"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  to="/Home"
                  onSubmit={handleLogin}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                    <Link>
                      {"Don't have an account? Sign Up"}
                    </Link>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    
    }

export default Login;

