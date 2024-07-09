import React from "react";
import { UserType } from "../../../type/userType";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";
import { Box, CircularProgress } from "@mui/material";
import UserListCard from "./UserListCard";

interface IFollowingsList {
  userId: string;
}

const FollowingsList: React.FC<IFollowingsList> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [followings, setFollowings] = React.useState<UserType[] | null>(null);

  const getFollowingsList = async (searchKeyWord: string) => {
    setLoading(true);
    const data = await getDataFromApi(
      "/api/v1/getFollowings",
      ApiMethods.POST,
      {
        keyword: searchKeyWord,
        page: currentPage,
      },
      { userId: props.userId }
    );
    if (data.success && data.data) {
      setFollowings(data.data.followings);
      setTotalPage(data.data.followersCount / data.data.resultPerPage);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (props.userId && props.userId !== "") getFollowingsList("");
  }, [props.userId]);
  return (
    <React.Fragment>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <CircularProgress thickness={2.5} />
        </Box>
      )}
      {!loading && <UserListCard users={followings} setUsers={setFollowings} />}
    </React.Fragment>
  );
};

export default FollowingsList;
