import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { useParams } from "react-router-dom";
import { Alerts } from "../components/Alerts";
import { useEffect } from "react";

const defaultTheme = createTheme();

export const SignInUp = () => {
  const param=useParams()
  const { loginUser,msg,signUpUser,setMsg} = useContext(UserContext);
  const navigate=useNavigate()

  useEffect(()=>{
    setMsg('')
    document.querySelector('form').reset()
  },[param?.type])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(param.type=='in')
      loginUser(data.get("email"), data.get("password"));
    else
      signUpUser(data.get('email'),data.get('password'))
    console.log(event.target);
  };
console.log(param,msg);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ boxShadow: "0 0 10px #1976d2" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {param.type=='in'?'Sign in':'Sign Up'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                {param.type=='in'?'Sign in':'Sign Up'}
            </Button>
           {/* <Typography sx={{color:'red',fontSize:'0.8rem',textAlign:'center'}}>{msg?.signin || msg?.signup}</Typography>*/}
          </Box>
        </Box>
        {param.type=='in' && 
          <Box display="grid" gridTemplateColumns="repeat(2,1fr)" >
            <Link
              component="button"
              variant="body2"
              onClick={() => {navigate('/pwreset')}}
            >
            Password reset
            </Link>
          
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Delete acount
            </Link>
          </Box>
        }
        {msg && <Alerts text={msg} severity='error' />}
      </Container>
    </ThemeProvider>
  );
};
