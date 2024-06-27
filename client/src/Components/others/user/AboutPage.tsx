import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomEditor } from "../../common/CustomEditor";
import CustomDailog from "../../common/CustomDailog";

const AboutPage = () => {
  const [dailogOpen, setDailogOpen] = React.useState(false);
  const [html, setHtml] = React.useState("");
  const [startEditing, setStartEditing] = React.useState(false);

  const openDailog = () => {
    setDailogOpen(true);
  };
  const closeDailog = () => {
    setDailogOpen(false);
  };
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
        <Grid container width={"100%"} gap={2} height={"auto"} mb={2}>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            border={"1px solid gray"}
            p={1}
            minHeight={"350px"}
          >
            <CustomEditor state={html} setState={setHtml} />
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
              size="small"
              sx={{ borderRadius: "25px", mr: 2 }}
              onClick={stopEdit}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: "25px", mr: 2 }}
              onClick={startEdit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: "25px" }}
              onClick={openDailog}
            >
              Preview
            </Button>
          </Grid>
        </Grid>
      </Box>
      <CustomDailog
        open={dailogOpen}
        title="View"
        handleClose={closeDailog}
        handleOpen={openDailog}
      >
        <Box dangerouslySetInnerHTML={{ __html: html }} />
      </CustomDailog>
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
