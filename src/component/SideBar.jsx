import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { React, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import logo from "../assets/gettingStartedLogo.png";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { bgcolor, flex } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { LogOut, Type } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
function SideBar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Box
        sx={{
          width: isOpen ? "200px" : "60px",
          height: "100vh",
          transition: "width 0.3s ease-in-out",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          px: isOpen ? 0 : 1,
          bgcolor: "#f8ececff",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isOpen ? "120px" : "50px",
            height: isOpen ? "70px" : "30px",
            transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
          }}
        />
        <Box
          sx={{
            width: isOpen ? "95%" : "42px",
            bgcolor: "green",
            display: "flex",
            justifyContent: "center",
            mt: 2,
            p: 0.5,
            borderRadius: "30px",
            cursor: "pointer",
            transition: "width 0.3s ease-in-out",
            color: "white",

            "&: hover": {
              bgcolor: "darkgreen",
            },
          }}
        >
          {isOpen ? "Create" : <AddIcon />}
        </Box>
        <ListItem
          disablePadding
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            justifyContent: isOpen ? "" : "center",
          }}
        >
          <Tooltip title={isOpen ? "" : "Home"} placement="right">
            <ListItemButton
              onClick={() => {
                navigate("/main/home");
              }}
              sx={{
                bgcolor:
                  location.pathname === "/main/home" ||
                  location.pathname === "/main"
                    ? "gray"
                    : "lightgray",
                justifyContent: isOpen ? "flex-start" : "center",
                width: "100%",
                overflow: "hidden", // prevents overflow
                borderRadius: isOpen ? 0 : 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>

              <ListItemText
                primary="Home"
                sx={{
                  display: !isOpen ? "none" : "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  m: 0,
                  transition: "display 0.3s ease",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip title={isOpen ? "" : "About Us"} placement="right">
            <ListItemButton
              onClick={() => {
                navigate("/main/about");
              }}
              sx={{
                bgcolor:
                  location.pathname != "/main/about" ? "lightgray" : "gray",
                px: isOpen ? 2 : 0,
                justifyContent: isOpen ? "flex-start" : "center",
                width: "100%",
                borderRadius: isOpen ? 0 : 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primary="About Us"
                sx={{
                  display: !isOpen ? "none" : "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  m: 0,
                  transition: "display 0.3s ease",
                }}
              />
            </ListItemButton>
          </Tooltip>
          <Tooltip title={isOpen ? "" : "Contact Us"}>
            <ListItemButton
              onClick={() => {
                navigate("/main/contact");
              }}
              sx={{
                bgcolor:
                  location.pathname != "/main/contact" ? "lightgray" : "gray",
                px: isOpen ? 2 : 0,
                justifyContent: isOpen ? "flex-start" : "center",
                width: "100%",
                transition: "opacity 0.3s all",
                borderRadius: isOpen ? 0 : 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PhoneIcon />
              </ListItemIcon>

              <ListItemText
                primary="Contact Us"
                sx={{
                  display: !isOpen ? "none" : "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  m: 0,
                  transition: "display 0.3s ease",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <Tooltip title={isOpen ? "" : "LogOut"} placement="right">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              pl: isOpen ? 2 : 1,
              pr: isOpen ? 2 : 1,
              backgroundColor: "white",
              borderRadius: 2,
              position: "fixed",
              bottom: 5,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => navigate("/")}
          >
            <LogOut size={18} className="text-red-500" />
            <Box
              sx={{
                maxWidth: isOpen ? 200 : 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                transition: "max-width 0.3s ease",
              }}
            >
              <Typography
                sx={{
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
}

export default SideBar;
