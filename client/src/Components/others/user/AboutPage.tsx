import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomEditor } from "../../common/CustomEditor";
import CustomDailog from "../../common/CustomDailog";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";
import { AuthContext } from "../../../Store";
import { UserType } from "../../../type/userType";

const AboutPage = () => {
  const context = React.useContext(AuthContext);
  const [usersBio, setUsersBio] = React.useState<{
    loading: boolean;
    startEditing: boolean;
  }>({
    loading: false,
    startEditing: false,
  });
  const [dailogOpen, setDailogOpen] = React.useState(false);
  const [html, setHtml] = React.useState(() => {
    return context.user?.bio ?? "";
  });

  const openDailog = () => {
    setDailogOpen(true);
  };

  const closeDailog = () => {
    setDailogOpen(false);
  };

  const startEdit = () => {
    setUsersBio((prevState) => ({ ...prevState, startEditing: true }));
  };

  const stopEdit = () => {
    setUsersBio((prevState) => ({ ...prevState, startEditing: false }));
  };

  const AddEditUsersBio = async (value: string) => {
    setUsersBio((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const data = await getDataFromApi(
      "/api/v1/addBio",
      ApiMethods.POST,
      {},
      {
        bio: value,
      }
    );
    if (data.success && data.data) {
      context.setUser((prevState: any) => ({
        ...prevState,
        bio: data.data,
      }));
      setHtml(data.data);
    }
    setUsersBio((prevState) => ({
      ...prevState,
      loading: false,
    }));
    stopEdit();
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
        size="small"
        variant="outlined"
        sx={{ borderRadius: "25px" }}
        onClick={startEdit}
      >
        Get Started
      </Button>
    </Box>
  );

  const loaderJSX = (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress thickness={2.5} />
    </Box>
  );

  const BioJSX = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            height: "50vh",
            background: "#0000000a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20PX",
            px: 6,
          }}
          dangerouslySetInnerHTML={{
            __html: context.user?.bio ? context.user?.bio : "",
          }}
        />
      </Grid>
      <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
        <Button
          size="small"
          variant="outlined"
          onClick={startEdit}
          sx={{ borderRadius: "25px" }}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
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
            sx={{ minHeight: { md: "350px", xs: "415px" } }}
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
              size="small"
              variant="outlined"
              sx={{ borderRadius: "25px", mr: 2 }}
              onClick={stopEdit}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: "25px", mr: 2 }}
              onClick={() => {
                AddEditUsersBio(html);
              }}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
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
        showTitle={true}
        title="Your Bio"
        handleClose={closeDailog}
      >
        <Box dangerouslySetInnerHTML={{ __html: html }} />
        <Button size="small" variant="outlined" onClick={closeDailog}>
          Close
        </Button>
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
      {usersBio.loading ? (
        loaderJSX
      ) : (
        <React.Fragment>
          {context.user?.bio ? (
            <React.Fragment>
              {usersBio.startEditing ? AboutEditPage : BioJSX}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {usersBio.startEditing ? AboutEditPage : AboutCallBackPage}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};

export default AboutPage;
