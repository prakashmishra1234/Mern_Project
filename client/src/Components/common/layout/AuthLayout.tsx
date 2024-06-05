import { Box, Paper } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import backgorundImageForAuthComp from "../../../assets/backgorundImageForAuthComp.jpeg";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgorundImageForAuthComp})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "0.8rem",
          borderRadius: "1rem",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.13)",
          width: { sm: "45%", md: "35%", xs: "100%" },
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
