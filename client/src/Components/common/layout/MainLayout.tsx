import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box height={"100%"}>
      <Box height={"10%"}>
        <Navbar />
      </Box>
      <Box p={"1rem"} height={"calc(90% - 2rem)"}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
