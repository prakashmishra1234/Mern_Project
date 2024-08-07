import React from "react";
import { UserType } from "../../../type/userType";
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import ProfileImg from "../../../assets/profile-major.svg";
import VerifiedIcon from "@mui/icons-material/Verified";
import { AuthContext } from "../../../Store";
import CustomDailog from "../../common/CustomDailog";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";

interface IUserCard {
  users: UserType[] | null;
  setUsers: React.Dispatch<React.SetStateAction<UserType[] | null>>;
}

const UserListCard: React.FC<IUserCard> = ({ users, setUsers }) => {
  const context = React.useContext(AuthContext);
  const [dailogOpen, setDailogOpen] = React.useState(false);
  const [userToUnfollow, setUserToUnfollow] = React.useState("");

  const openDailog = () => {
    setDailogOpen(true);
  };

  const closeDailog = () => {
    setDailogOpen(false);
  };

  const UnFollowConfirmation = (id: string) => {
    setUserToUnfollow(id);
    openDailog();
  };

  const followUsers = async (id: string) => {
    const data = await getDataFromApi(
      "/api/v1/followUser",
      ApiMethods.POST,
      {},
      { userId: id }
    );
    if (data.success) {
      if (context.user) {
        let temp = [...context.user.followings];
        temp.push(id);
        context.setUser((prevState: any) => ({
          ...prevState,
          followings: temp,
        }));
        if (users) {
          const temp2: UserType[] = [...users];
          temp2.map((item, index) => {
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
    if (data.success) {
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
          temp2.map((item, i) => {
            if (item._id === id) {
              const index = temp.indexOf(id);
              item.followers.splice(index, 1);
              temp2.splice(i, 1);
            }
          });
          context.user.followings.splice(
            context.user.followings.indexOf(id),
            1
          );
          setUsers(temp2);
        }
      }
    }
    closeDailog();
  };

  const UnFollowDeclined = () => {
    setUserToUnfollow("");
    closeDailog();
  };

  return (
    <React.Fragment>
      {users && users?.length < 1 && (
        <Typography textAlign={"center"}>No data found!</Typography>
      )}
      {users && users.length > 0 && (
        <Grid container spacing={2}>
          {users.map((user: UserType, index: number) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <IconButton sx={{ p: 0, height: "4rem", width: "4rem" }}>
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
                        >
                          {user.followings.length ?? 0} Followings
                        </Link>
                      </Box>
                      {user._id !== context.user?._id && (
                        <React.Fragment>
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
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      <CustomDailog
        showTitle={false}
        open={dailogOpen}
        handleClose={closeDailog}
      >
        <Typography>Are you sure you want to unfollow?</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer", m: 1 }}
            onClick={UnFollowDeclined}
          >
            No
          </Link>
          <Link
            sx={{ textDecoration: "none", cursor: "pointer", m: 1 }}
            onClick={() => unfollowUsers(userToUnfollow)}
          >
            Yes
          </Link>
        </Box>
      </CustomDailog>
    </React.Fragment>
  );
};

export default UserListCard;
