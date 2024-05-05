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
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



function loginFailureAlert(){
  return(<Stack sx={{ width: '100%' }} spacing={2}>
  <Alert variant="filled" severity="error">
    This is a filled error Alert.
  </Alert>
  </Stack>)
}

function Login(){
    const defaultUser = useState({
        username: '',
        password: '',
        salt: '',
    });

    const userData = useSelector(store => store.user); // Assuming 'user' is the key where user data is stored in your Redux store
    
    const [user, setUser] = useState(defaultUser);

    var loginTried = false;

    const dispatch = useDispatch();
    const defaultTheme = createTheme();

    const handleLogin = (event) => {
        event.preventDefault();
        try{
          dispatch({ type: 'LOGIN', payload: user });
          throw new Error("Login failed: Incorrect username or password");
          
        } catch(error){
          loginFailureAlert();
        }
        
    }

      return (
        <ThemeProvider theme={defaultTheme}>
                      <loginFailureAlert/>

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
              <Box component="form"  noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username:"
                  name="username"
                  onChange={ (event) => setUser({ ...user, username: event.target.value }) } 
                  autoComplete="username"
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
                  onChange={ (event) => setUser({ ...user, password: event.target.value }) } 
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  onClick={handleLogin}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  
                >                  
                  Sign In
                  
                  {userData.message === 'Login success' && <Navigate to="/Home"/> }
                  </Button>
                  {////TODO
                  /*
                    <Link>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  */}
                  
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    
    }

export default Login;

