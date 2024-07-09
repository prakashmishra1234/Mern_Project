import React from "react";
import { AuthContext } from "../Store";
import { Alert, Grid } from "@mui/material";
import { UserType } from "../type/userType";
import CustomPagination from "../Components/common/Pagination";
import SearchBar from "../Components/common/SearchBar";
import { SearchModel } from "../type/SearchType";
import { getDataFromApi } from "../api/CustomApiCall";
import { ApiMethods } from "../enum/ApiMethods";
import UserListCard from "../Components/others/user/UserListCard";

const UserManagement = () => {
  const context = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<UserType[] | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const getUsersList = async (searchKeyWord: string, page: number) => {
    context.setLoading(true);
    const data = await getDataFromApi("/api/v1/users", ApiMethods.GET, {
      keyword: searchKeyWord,
      page: page,
    });
    if (data.success && data.data) {
      setUsers(data.data.users);
      setTotalPage(Math.ceil(data.data.userCount / data.data.resultPerPage));
    }
    context.setLoading(false);
  };

  const handlePaginationChanges = (
    e: React.ChangeEvent<unknown>,
    newPage: any
  ) => {
    setCurrentPage(newPage);
  };

  const handleSearchSubmit = (value: SearchModel) => {
    setCurrentPage(1);
    getUsersList(value.searchValue ?? "", 1);
  };

  React.useEffect(() => {
    getUsersList("", currentPage);
  }, [currentPage]);

  const cardJsx = React.useMemo(() => {
    return <UserListCard users={users} setUsers={setUsers} />;
  }, [users]);

  return (
    <React.Fragment>
      <SearchBar handleSubmit={handleSearchSubmit} />

      {users && users.length < 1 && (
        <Alert severity="error">{"No data found!"}</Alert>
      )}
      {cardJsx}
      {totalPage > 1 && (
        <Grid container py={2}>
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
