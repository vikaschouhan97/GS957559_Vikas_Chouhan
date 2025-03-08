import React from "react";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { drawerWidth } from "../navbar/navbar";
import Toolbar from "@mui/material/Toolbar";
import { SideBarItems } from "../../constants";
import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
  const navigate = useNavigate();
  const handleNavigate = (link: string) => {
    navigate(link);
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {SideBarItems.map((item, index) => (
          <ListItem
            key={`${item.id}-${index}`}
            disablePadding
            selected={window.location.href.includes(item.link)}
            sx={{
              "&.Mui-selected": {
                background: "#d0d0d0",
              },
            }}
          >
            <ListItemButton onClick={() => handleNavigate(item.link)}>
              <ListItemIcon>{<item.icon />}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <Drawer
        variant="temporary"
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default SideNavigation;
