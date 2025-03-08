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
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";

// Hidden input for file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 0.5,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Drawer width constant
export const drawerWidth = 170;

// User settings options
const settings = ["Logout"];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  /**
   * Opens the user menu dropdown
   * @param event - Click event
   */
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Handles menu item selection
   * @param type - Selected menu option
   */
  const handleCloseUserMenu = (type: string) => {
    if (type === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("file");
      navigate("/login");
    }
    setAnchorElUser(null);
  };

  /**
   * Handles file upload and validates required sheets
   * @param event - File input change event
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });

      // Required sheets validation
      const requiredSheets = ["Stores", "SKUs", "Calendar", "Planning"];
      const existingSheets = workbook.SheetNames;
      const missingSheets = requiredSheets.filter(sheet => !existingSheets.includes(sheet));

      if (missingSheets.length > 0) {
        alert(`Missing sheets: ${missingSheets.join(", ")}`);
        return;
      }

      // Store file as Base64 in localStorage
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        localStorage.setItem("file", JSON.stringify(fileReader.result));
      };
      //eslint-disable-next-line
      fileReader.onerror = (error) => console.error("Error reading file:", error);
    };

    reader.readAsBinaryString(file);
  };

  return (
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
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            {/* Logo Section */}
            <Box sx={{ width: "120px" }}>
              <Logo data-testid="company-logo" />
            </Box>

            {/* File Upload Button (Visible only when logged in) */}
            {localStorage.getItem("token") && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  size="small"
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ height: "32px" }}
                >
                  Upload files
                  <VisuallyHiddenInput type="file" onChange={handleFileUpload} multiple />
                </Button>
              </Box>
            )}

            {/* User Profile Section */}
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              {localStorage.getItem("token") ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} disableRipple>
                    <Avatar>
                      <AccountCircleSharpIcon sx={{ color: "white" }} />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography sx={{ color: "#000000", cursor: "pointer" }}>
                  Login
                </Typography>
              )}

              {/* User Menu */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
