import axios from "axios";
import React from "react";
import { AuthContext } from "../Store";
import {
  Alert,
  Avatar,
  Button,
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

const UserManagement = () => {
  const context = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<UserType[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

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
                        <Typography fontSize={"small"} display="flex">
                          {user.fullname}
                          {user.isVerified && (
                            <VerifiedIcon
                              fontSize="small"
                              sx={{ color: "#0676d5", pl: 1 }}
                            />
                          )}
                        </Typography>

                        {!user.followers.includes(context.user?._id ?? "") ? (
                          <Link
                            sx={{ textDecoration: "none", cursor: "pointer" }}
                            onClick={() => followUsers(user._id)}
                          >
                            Follow
                          </Link>
                        ) : (
                          <Link
                            sx={{ textDecoration: "none", cursor: "pointer" }}
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
    </React.Fragment>
  );
};

export default UserManagement;
