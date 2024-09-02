import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import LoginParent from "./LoginParent";

function ParentComponent() {
  const [loginClick,setLoginClick] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }} maxWidth>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>
            <Button color="inherit" onClick={()=>setLoginClick(true)}>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {loginClick && (<LoginParent/>)}  
      
      </>
  );
}

export default ParentComponent;
