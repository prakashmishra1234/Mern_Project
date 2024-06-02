import axios from "axios";
import React from "react";
import { AuthContext } from "../Store";
import { Alert, Card, Grid, Link, Typography } from "@mui/material";
import { userType } from "../type/userType";
import { formatDateTime } from "../utils/helper";
import VerifiedIcon from "@mui/icons-material/Verified";
import CustomPagination from "../Components/common/Pagination";
import SearchBar from "../Components/common/SearchBar";
import { SearchModel } from "../type/SearchType";

const UserManagement = () => {
  const context = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<userType[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const getUsersList = (searchKeyWord: string) => {
    context.setLoading(true);
    axios
      .get(`/api/v1/users?keyword=${searchKeyWord}&page=${currentPage}`)
      .then((res: any) => {
        setUsers(res.data.data.users);
        setTotalPage(res.data.data.userCount / res.data.data.resultPerPage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        context.setLoading(false);
      });
  };

  const handlePaginationChanges = (
    e: React.ChangeEvent<unknown>,
    newPage: any
  ) => {
    setCurrentPage(newPage);
  };

  const handleSearchSubmit = (value: SearchModel) => {
    getUsersList(value.searchValue ?? "");
  };

  React.useEffect(() => {
    getUsersList("");
  }, [currentPage]);

  return (
    <React.Fragment>
      <Grid container spacing={2} pb={2}>
        <Grid item xs={12} md={6}>
          <SearchBar handleSubmit={handleSearchSubmit} />
        </Grid>
      </Grid>
      {users && users.length < 1 && (
        <Alert severity="error">{"No data found!"}</Alert>
      )}
      {users && users.length > 0 && (
        <Grid container spacing={2}>
          {users.map((user, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Card sx={{ padding: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={4} md={4}>
                      <Typography fontSize={"small"} color={"#918a8a"}>
                        Email:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        sx={{ wordWrap: "break-word", display: "flex" }}
                      >
                        {user.email}

                        {user.isVerified && (
                          <VerifiedIcon
                            fontSize="small"
                            sx={{ color: "#0676d5", pl: 1 }}
                          />
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Typography fontSize={"small"} color={"#918a8a"}>
                        Name:
                      </Typography>
                      <Typography fontSize={"small"}>
                        {user.fullname}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Typography fontSize={"small"} color={"#918a8a"}>
                        Username:
                      </Typography>
                      <Typography fontSize={"small"}>
                        {user.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Typography fontSize={"small"} color={"#918a8a"}>
                        Role:
                      </Typography>
                      <Typography fontSize={"small"}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                      <Typography fontSize={"small"} color={"#918a8a"}>
                        Creation date:
                      </Typography>
                      <Typography fontSize={"small"}>
                        {new Date(user.createdAt!).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} pt={1}>
                    <Grid item xs={12} textAlign={"right"}>
                      <Link sx={{ cursor: "pointer" }}>Edit</Link>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
          {totalPage > 1 && (
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <CustomPagination
                count={totalPage}
                page={currentPage}
                handleChange={handlePaginationChanges}
              />
            </Grid>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
};

export default UserManagement;
