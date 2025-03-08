import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as Logo } from "../../assets/images/gsynergyLogo.svg";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { useNavigate } from "react-router-dom";

export const drawerWidth = 170;

const settings = ["Logout"];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (type: string) => {
    if (type === "Logout") {
      localStorage.setItem("token", "");
      navigate("/login");
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          position: "absolute",
          top: 0,
          backgroundColor: "#ffff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ width: "120px" }}>
                <Logo />
              </Box>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {localStorage.getItem("token") ? (
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    disableRipple
                  >
                    <Avatar alt="Remy Sharp">
                      <AccountCircleSharpIcon sx={{ color: "white" }} />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography sx={{ color: "#000000", cursor: "pointer" }}>
                  Login
                </Typography>
              )}

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
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
