import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from '@mui/material/Avatar';
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
//import LogoutIcon from "@mui/icons-material/Logout";
//import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { getAvatar } from "../utility/uploadFile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const pages = [
  { path: "/", name: "Főoldal" },
  { path: "/about", name: "Rólam" },
];
const settings = [
  { path: "/profile", name: "Fiókod" },
  { path: "/logout", name: "Kijelentkezés" },
];

export const Navbar = ({avatar,setAvatar}) => {
  const { user, logoutUser } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navPages, setNavPages] = useState(pages);
  const navigate=useNavigate()

  useEffect(() => {
    setAvatar(null)
    if (user) {
      setNavPages([...pages, { path: "/create", name: "Posztolj" }]);
      //getAvatar(user.uid,setAvatar)
    }else 
      setNavPages([...pages]);
   
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log(user);
  return (
    <AppBar  sx={{backgroundImage:"linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)"}}>
      <Container maxWidth="1200px" >
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{ borderRadius:'50%',display: { xs: "none", md: "flex" }}}>
              <img style={{maxWidth:'50px'}} src="kam.ico" alt="kam" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: { xs: "block", md: "none" },}}
            >
              {navPages.map((obj) => (
                <NavLink key={obj.name} to={obj.path} className={({ isActive }) => (isActive ? "active" : "")} >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{obj.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((obj) => (
              <NavLink key={obj.name} to={obj.path} className={({ isActive }) => (isActive ? "active" : "")}>
                <Button onClick={handleCloseNavMenu}  sx={{ my: 2, color: " #f7797d", display: "block" }} >
                  {obj.name}
                </Button>
              </NavLink>
            ))}
          </Box>

        
            {!user ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton sx={{ p: 0 }}>
                  <NavLink to="/signinup/in" className={({ isActive }) => (isActive ? "active" : "")} >
                    <Typography  textAlign="center" sx={{ color: "white", padding: "10px" }}>
                      Bejelentkezés
                    </Typography>
                  </NavLink>
                </IconButton>
                <IconButton sx={{ p: 0 }}>
                  <NavLink to="/signinup/up" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Typography textAlign="center"  sx={{ color: "white", padding: "10px" }} >
                      Regisztráció
                    </Typography>
                  </NavLink>
                </IconButton>
              </Box>
            ) : (
                <Box sx={{ flexGrow: 0 }}>    
                    <IconButton title={user.email} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar  />
                    </IconButton>
                 
                  <Menu  sx={{ mt: "45px",border:'1px solid red'}} id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{vertical: "top", horizontal: "right",}}
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right", }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu} >
                        <Typography textAlign="center" onClick={()=>setting.name=='Logout' ? logoutUser() : navigate(setting.path)}>
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box> 
            )}
        
        </Toolbar>
      </Container>
    </AppBar>
  );
};
