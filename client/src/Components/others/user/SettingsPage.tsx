import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { AuthContext } from "../../../Store";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const SettingsPage = () => {
  const context = React.useContext(AuthContext);
  return (
    <Box pt={2}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography>{context.user?.fullname}</Typography>
        <IconButton>
          <EditOutlinedIcon />
        </IconButton>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography>{context.user?.email}</Typography>
        <IconButton>
          <EditOutlinedIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
