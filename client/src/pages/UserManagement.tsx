import React from "react";
import { AuthContext } from "../Store";
import {
  Alert,
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { UserType } from "../type/userType";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomPagination from "../Components/common/Pagination";
import SearchBar from "../Components/common/SearchBar";
import { SearchModel } from "../type/SearchType";
import { getDataFromApi } from "../api/CustomApiCall";
import { ApiMethods } from "../enum/ApiMethods";
import ProfileImg from "../assets/profile-major.svg";
import CustomDailog from "../Components/common/CustomDailog";
import FollowersList from "../Components/others/user/FollowersList";
import FollowingsList from "../Components/others/user/FollowingsList";

const UserManagement = () => {
  const context = React.useContext(AuthContext);
  const [dailogOpen, setDailogOpen] = React.useState(false);
  const [followersdailogOpen, setFollowersDailogOpen] = React.useState(false);
  const [followingsdailogOpen, setFollowingsDailogOpen] = React.useState(false);
  const [userToUnfollow, setUserToUnfollow] = React.useState("");
  const [users, setUsers] = React.useState<UserType[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [followersUserId, setFollowersUserId] = React.useState("");
  const [followingsUserId, setFollowingsUserId] = React.useState("");

  const UnFollowConfirmation = (id: string) => {
    setUserToUnfollow(id);
    openDailog();
  };

  const UnFollowDeclined = () => {
    setUserToUnfollow("");
    closeDailog();
  };

  const openDailog = () => {
    setDailogOpen(true);
  };

  const closeDailog = () => {
    setDailogOpen(false);
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

  const getUsersList = async (searchKeyWord: string) => {
    context.setLoading(true);
    const data = await getDataFromApi("/api/v1/users", ApiMethods.GET, {
      keyword: searchKeyWord,
      page: currentPage,
    });
    if (data.success && data.data) {
      setUsers(data.data.users);
      setTotalPage(data.data.userCount / data.data.resultPerPage);
    }
    context.setLoading(false);
  };

  const followUsers = async (id: string) => {
    const data = await getDataFromApi(
      "/api/v1/followUser",
      ApiMethods.POST,
      {},
      { userId: id }
    );
    if (data.success && data.data) {
      if (context.user) {
        let temp = [...context.user.followings];
        temp.push(id);
        context.setUser((prevState: any) => ({
          ...prevState,
          followings: temp,
        }));
        if (users) {
          const temp2: UserType[] = [...users];
          temp2.map((item) => {
            if (item._id === id) {
              context.user && item.followers.push(context.user?._id);
            }
          });
          setUsers(temp2);
        }
      }
    }
  };

  const unfollowUsers = async (id: string) => {
    const data = await getDataFromApi(
      "/api/v1/unFollowUser",
      ApiMethods.POST,
      {},
      { userId: id }
    );
    if (data.success && data.data) {
      if (context.user) {
        let temp = [...context.user.followings];
        const index = temp.indexOf(id);
        temp.splice(index, 1);
        context.setUser((prevState: any) => ({
          ...prevState,
          followings: temp,
        }));
        if (users) {
          const temp2: UserType[] = [...users];
          temp2.map((item) => {
            if (item._id === id) {
              const index = temp.indexOf(id);
              item.followers.splice(index, 1);
            }
          });
          setUsers(temp2);
        }
      }
    }
    closeDailog();
  };

  const handlePaginationChanges = (
    e: React.ChangeEvent<unknown>,
    newPage: any
  ) => {
    setCurrentPage(newPage);
  };

  const handleSearchSubmit = (value: SearchModel) => {
    setCurrentPage(1);
    getUsersList(value.searchValue ?? "");
  };

  React.useEffect(() => {
    getUsersList("");
  }, [currentPage]);

  const followersListJSX = React.useMemo(
    () => <FollowersList userId={followersUserId} />,
    [followersUserId]
  );

  const cardJsx = React.useMemo(() => {
    return (
      <React.Fragment>
        {users && users.length > 0 && (
          <Grid container spacing={2}>
            {users.map((user, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ padding: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <IconButton
                          sx={{ p: 0, height: "4rem", width: "4rem" }}
                        >
                          <Avatar
                            sx={{ height: "100%", width: "100%" }}
                            alt="Avatar"
                            src={user.picture ? user.picture : ProfileImg}
                          />
                        </IconButton>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography
                          fontSize={"small"}
                          display="flex"
                          sx={{ fontSize: "18px" }}
                          alignItems={"center"}
                        >
                          {user.fullname}
                          {user.isVerified && (
                            <VerifiedIcon
                              fontSize="small"
                              sx={{ color: "#0676d5", pl: 1 }}
                            />
                          )}
                        </Typography>
                        <Box display={"flex"} sx={{ mb: { xs: 1 } }}>
                          <Link
                            sx={{
                              cursor: "pointer",
                              textDecoration: "none",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                            fontFamily={"math"}
                            display={"flex"}
                            alignItems={"center"}
                            onClick={() => openFollowersDailog(user._id)}
                          >
                            {user.followers.length ?? 0} Followers{" "}
                          </Link>
                          <Link
                            fontFamily={"math"}
                            display={"flex"}
                            alignItems={"center"}
                            sx={{
                              ml: 2,
                              cursor: "pointer",
                              textDecoration: "none",
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                            onClick={() => openFollowingsDailog(user._id)}
                          >
                            {user.followings.length ?? 0} Followings
                          </Link>
                        </Box>
                        {!user.followers.includes(context.user?._id ?? "") ? (
                          <Link
                            sx={{
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => followUsers(user._id)}
                          >
                            Follow
                          </Link>
                        ) : (
                          <Link
                            sx={{
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => UnFollowConfirmation(user._id)}
                          >
                            Following
                          </Link>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </React.Fragment>
    );
  }, [context.user, users]);

  return (
    <React.Fragment>
      <SearchBar handleSubmit={handleSearchSubmit} />

      {users && users.length < 1 && (
        <Alert severity="error">{"No data found!"}</Alert>
      )}
      {cardJsx}
      {totalPage > 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <CustomPagination
              count={totalPage}
              page={currentPage}
              handleChange={handlePaginationChanges}
            />
          </Grid>
        </Grid>
      )}
      <CustomDailog open={dailogOpen} handleClose={closeDailog}>
        <Typography>Are you sure you want to unfollow?</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer", m: 1 }}
            onClick={() => unfollowUsers(userToUnfollow)}
          >
            Yes
          </Link>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer", m: 1 }}
            onClick={UnFollowDeclined}
          >
            No
          </Link>
        </Box>
      </CustomDailog>
      <CustomDailog
        open={followersdailogOpen}
        handleClose={closeFollowersDailog}
        title="Followers"
      >
        {followersListJSX}
      </CustomDailog>
      <CustomDailog
        open={followingsdailogOpen}
        handleClose={closeFollowingsDailog}
        title="Followings"
      >
        <FollowingsList userId={""} />
      </CustomDailog>
    </React.Fragment>
  );
};

export default UserManagement;
