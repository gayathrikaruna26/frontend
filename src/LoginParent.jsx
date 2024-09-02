import {
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import Main from "./Main"; 
import { Container } from "@mui/system";
function LoginParent() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');
  const [loginClick, setLoginClick] = useState(true);
  const [loginShow,setLoginShow]= useState(true);
  const [showTable,setShowTable]= useState(false);
  const [forgotPasswordClick, setForgotPasswordClick] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [conformPass, setConformPass] = useState("");

  function handleChange(value, data) {
    if (value === "userName") {
      setUserName(data);
    } else if (value === "password") {
      setPassword(data);
    } else if (value === "role"){
      setRole(data);
    } 
    else if (value === "NewPassword") {
      setNewPass(data);
    } else if (value === "ConformPassword") {
      setConformPass(data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userName === "") {
      alert("user Id Required");
    } else if (password === "") {
      alert("password field is Empty");
    } else if (userName && password) {
      CheckUser(userName, password,role);
    }
  }

  function handlePassChange(e) {
    e.preventDefault();
    if (newPass === "") {
      alert("Password field is empty");
    } else if (conformPass === "") {
      alert("New Pass Field Empty");
    } else if (newPass && conformPass) {
      if (newPass !== conformPass) {
        alert("Passwords doesnot match");
      } else if (newPass === conformPass) {
        alert("password updated Sucessful");
      }
    }
  }

async function CheckUser(name, pass, role) {
  const data = { userName: name, password: pass, Role: role };
  await fetch("http://localhost:8001/CheckLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },  
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User Found") {
        alert("login Success");
        loginSuccess();
      } else if (data.message === "User Not Found") {
        alert("user unavailable");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  function handleClick(key) {
    if (key === "SignIn") {
      setLoginClick(true);
      setForgotPasswordClick(false);
    }
    if (key === "ForgotPassword") {
      setLoginClick(false);
      setForgotPasswordClick(true);
    }
  }

  function loginSuccess(){
    setLoginShow(false)
    setShowTable(true);
  }  

  return (
    <>
   {loginShow && ( <Paper elevation={6} sx={{ m: 10 }}>
      <Grid container component="main">
        <Grid
          item
          xs={false}
          loginImage
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2021/12/28/01/07/website-6898411_1280.png")',
            backgroundColor: grey[50],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
          component={Paper}
          square
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} square>
          {loginClick && (
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  value={userName}
                  onChange={(e) => handleChange("userName", e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => handleChange("password", e.target.value)}
                  value={password}
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="role"
                  label="Role"
                  id="role"
                  onChange={(e) => handleChange("role", e.target.value)}
                  value={role}
                  autoComplete="role"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => handleClick("ForgotPassword")}
                      variant="body2"
                      component={Button}
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}

          {forgotPasswordClick && (
            <Box
              sx={{
                my: 6,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handlePassChange}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  value={userName}
                  onChange={(e) => handleChange("userName", e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="New Password"
                  label="New Password"
                  type="password"
                  id="New Password"
                  onChange={(e) => handleChange("NewPassword", e.target.value)}
                  value={newPass}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="Conform Password"
                  label="Conform Password"
                  type="password"
                  id="Conform password"
                  onChange={(e) =>
                    handleChange("ConformPassword", e.target.value)
                  }
                  value={conformPass}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
                <Grid container sx={{ mt: 5 }}>
                  <Grid item xs>
                    <Link
                      onClick={() => handleClick("SignIn")}
                      variant="body2"
                      component={Button}
                    >
                      Existing User? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>)}
    {showTable &&(<Main/>)}
    </>
  );
}

export default LoginParent;
