import React, { lazy, Suspense, useState } from "react";
import SideBar from "./SideBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
function MainMenu() {
  //const SideBarMenu = lazy(() => import("./SideBar"));
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: "flex", overflowY: "auto" }}>
        <SideBar isOpen={isOpen} />
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: "fixed",
            left: isOpen ? "170px" : "30px",
            transition: " 0.3s ease-in-out",
            zIndex: 100,
            top: 2,
          }}
        >
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <Box
          sx={{
            height: "100vh",
            width: "100%",

            ml: isOpen ? "201px" : "60px",
            transition: "margin 0.3s ease",
          }}
        >
          <NavBar />
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainMenu;
