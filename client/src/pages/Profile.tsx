import { Box } from "@mui/material";
import { AuthContext } from "../Store";
import { useContext } from "react";

const Profile = () => {
  const context = useContext(AuthContext);

  return <Box>{context?.user?.fullname ?? ""}</Box>;
};

export default Profile;
