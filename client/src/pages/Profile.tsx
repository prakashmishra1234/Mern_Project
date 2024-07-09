import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AuthContext } from "../Store";
import React from "react";
import ProfileImg from "../assets/profile-major.svg";
import SettingsPage from "../Components/others/user/SettingsPage";
import AboutPage from "../Components/others/user/AboutPage";
import CustomDailog from "../Components/common/CustomDailog";
import FollowersList from "../Components/others/user/FollowersList";
import FollowingsList from "../Components/others/user/FollowingsList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Profile = () => {
  const context = React.useContext(AuthContext);
  const [followersdailogOpen, setFollowersDailogOpen] = React.useState(false);
  const [followingsdailogOpen, setFollowingsDailogOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [followersUserId, setFollowersUserId] = React.useState("");
  const [followingsUserId, setFollowingsUserId] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const openFollowersDailog = (id: string) => {
    setFollowersUserId(id);
    setFollowersDailogOpen(true);
  };

  const closeFollowersDailog = () => {
    setFollowersUserId("");
    setFollowersDailogOpen(false);
  };

  const openFollowingsDailog = (id: string) => {
    setFollowingsUserId(id);
    setFollowingsDailogOpen(true);
  };

  const closeFollowingsDailog = () => {
    setFollowingsUserId("");
    setFollowingsDailogOpen(false);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{}}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const followersFollowingsCount = React.useMemo(() => {
    return (
      <Box display={"flex"} sx={{ mt: { xs: 0, md: 2 }, mb: { xs: 1, md: 0 } }}>
        <Link
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
          }}
          fontFamily={"math"}
          display={"flex"}
          alignItems={"center"}
          onClick={() => openFollowersDailog(context.user?._id ?? "")}
        >
          {context.user?.followers.length ?? 0} Followers{" "}
        </Link>
        <Link
          fontFamily={"math"}
          display={"flex"}
          alignItems={"center"}
          sx={{
            cursor: "pointer",
            textDecoration: "none",
            color: "rgba(0, 0, 0, 0.87)",
            ml: 2,
          }}
          onClick={() => openFollowingsDailog(context.user?._id ?? "")}
        >
          {context.user?.followings.length ?? 0} Followings
        </Link>
      </Box>
    );
  }, [context.user]);

  const followersListJSX = React.useMemo(
    () => <FollowersList userId={followersUserId} />,
    [followersUserId]
  );

  const followingsListJSX = React.useMemo(
    () => <FollowingsList userId={followingsUserId} />,
    [followingsUserId]
  );

  return (
    <Box height={"100%"}>
      <Grid
        container
        sx={{
          flexDirection: { xs: "column-reverse", md: "row !important" },
        }}
      >
        <Grid item xs={12} md={8}>
          <Box width={"100%"} sx={{ display: { md: "flex", xs: "none" } }}>
            <Typography
              fontSize={"2.5rem"}
              fontWeight={500}
              fontFamily={"math"}
            >
              {context.user?.fullname}
            </Typography>
          </Box>
          <Box width={"100%"}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Home" {...a11yProps(0)} />
              <Tab label="About" {...a11yProps(1)} />
              <Tab label="Settings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Box width={"100%"}>
            <CustomTabPanel value={value} index={0}>
              Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AboutPage />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <SettingsPage />
            </CustomTabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} container justifyContent={"center"}>
          <Box
            display={"flex"}
            sx={{
              alignItems: {
                md: "center",
                xs: "flex-start",
              },
              flexDirection: { md: "column", xs: "row" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <IconButton sx={{ p: 0, height: "6rem", width: "6rem" }}>
              <Avatar
                sx={{ height: "100%", width: "100%" }}
                alt="Avatar"
                src={context.user?.picture ? context.user?.picture : ProfileImg}
              />
            </IconButton>
            <Box sx={{ ml: { md: 0, xs: 2 } }}>
              <Typography
                sx={{ mt: { xs: 0.5, md: 2 } }}
                fontFamily={"math"}
                fontSize={"22px"}
                fontWeight={500}
              >
                {context.user?.fullname}
              </Typography>
              <Typography
                sx={{ display: { md: "flex", xs: "none" } }}
                fontFamily={"math"}
              >
                Software Developer
              </Typography>
              {followersFollowingsCount}
            </Box>
            <Box
              mt={4}
              width={"100%"}
              sx={{ display: { md: "flex", xs: "none" } }}
            >
              <Link sx={{ textDecoration: "none", cursor: "pointer" }}>
                Edit profile
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CustomDailog
        showTitle={true}
        open={followersdailogOpen}
        handleClose={closeFollowersDailog}
        title="Followers"
        dailogProps={{ fullScreen: true }}
      >
        {followersListJSX}
      </CustomDailog>
      <CustomDailog
        showTitle={true}
        dailogProps={{ fullScreen: true }}
        open={followingsdailogOpen}
        handleClose={closeFollowingsDailog}
        title="Followings"
      >
        {followingsListJSX}
      </CustomDailog>
    </Box>
  );
};

export default Profile;
