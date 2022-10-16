import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import React from "react";
import { Outlet } from "react-router-dom";
import StyledLink from "./styled-link";

interface Menu {
  label: string;
  dest: string;
}

interface AppBarProps extends React.PropsWithChildren {
  title: string;
  menu: Menu[];
  sx?: SxProps<Theme> | undefined;
}

const StyledAppBar = (props: AppBarProps) => {
  const theme = useTheme();
  const { menu, sx, title } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <AppBar
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          ...(mobileOpen ? { boxShadow: "none" } : {}),
        }}
      >
        <Toolbar
          sx={{
            boxSizing: "border-box",
            ...(mobileOpen
              ? { width: "100%" }
              : { width: "1200px", maxWidth: "100%" }),
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: theme.spacing(2), display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <StyledLink
              key="app-bar-title"
              to={""}
              sx={{
                paddingLeft: 0,
                fontWeight: 700,
                fontSize: "20px",
                "&:hover": {
                  background: "none",
                },
                "&:active": {
                  color: theme.palette.text.primary,
                },
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {title}
            </StyledLink>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {menu.map((item) => (
              <StyledLink key={item.label} to={item.dest}>
                {item.label}
              </StyledLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              maxWidth: "100%",
              top: "56px",
            },
            zIndex: theme.zIndex.appBar - 1,
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <List>
              {menu.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <StyledLink
                    key={item.label}
                    to={item.dest}
                    sx={{
                      borderRadius: 0,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            boxSizing: "border-box",
            height: { xs: "calc(100% - 56px)", sm: "calc(100% - 64px)" },
            ...sx,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StyledAppBar;
