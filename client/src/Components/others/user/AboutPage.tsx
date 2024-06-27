import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const AboutPage = () => {
  const [startEditing, setStartEditing] = React.useState(false);
  const startEdit = () => {
    setStartEditing(true);
  };
  const stopEdit = () => {
    setStartEditing(false);
  };

  const AboutCallBackPage = (
    <Box
      sx={{
        height: "50vh",
        background: "#0000000a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20PX",
        flexDirection: "column",
        px: 6,
        mx: { xs: 0, md: 6 },
      }}
    >
      <Typography pb={3} variant="h6">
        Tell the world about yourself
      </Typography>
      <Typography pb={3} sx={{ textAlign: "center" }}>
        Here’s where you can share more about yourself: your history, work
        experience, accomplishments, interests, dreams, and more. You can even
        add images and use rich text to personalize your bio.
      </Typography>
      <Button
        variant="outlined"
        sx={{ borderRadius: "25px" }}
        onClick={startEdit}
      >
        Get Started
      </Button>
    </Box>
  );

  const AboutEditPage = (
    <React.Fragment>
      <Box width={"100%"} marginBottom={"auto"} marginTop={2}>
        <Grid container width={"100%"} gap={2}>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <TextField multiline minRows={12} fullWidth autoFocus />
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              sx={{ borderRadius: "25px", mr: 2 }}
              onClick={stopEdit}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: "25px" }}
              onClick={startEdit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );

  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "63vh",
      }}
    >
      {!startEditing && AboutCallBackPage}
      {startEditing && AboutEditPage}
    </Box>
  );
};

export default AboutPage;