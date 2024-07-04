import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Store";
import ProfileImg from "../../../assets/profile-major.svg";

const pages: string[] = ["Home", "Users"];
const adminPages: string[] = [];
const settings: string[] = ["Profile"];

const Navbar = () => {
  const context = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickLogout = () => {
    context.logout();
  };

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
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
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={page.toLocaleLowerCase()}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  {page}
                </Link>
              </MenuItem>
            ))}
            {context.user &&
              context.user.role === "admin" &&
              adminPages.map((page) => (
                <MenuItem key={page}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={page.toLocaleLowerCase()}
                    onClick={() => handleCloseNavMenu(page)}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page) => (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                marginRight: 12,
              }}
              to={page.toLocaleLowerCase()}
              key={page}
              onClick={() => handleCloseNavMenu("page")}
            >
              {page}
            </Link>
          ))}
          {context.user &&
            context.user.role === "admin" &&
            adminPages.map((page) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={page.toLocaleLowerCase()}
                key={page}
                onClick={() => handleCloseNavMenu("page")}
              >
                {page}
              </Link>
            ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Avatar"
                src={context.user?.picture ? context.user?.picture : ProfileImg}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link
                  to={setting.toLocaleLowerCase()}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {setting}
                </Link>
              </MenuItem>
            ))}
            <MenuItem onClick={onClickLogout}>
              <Typography textAlign="center">{"Logout"}</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  );
};

export default Navbar;
