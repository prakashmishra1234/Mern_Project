import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../Store";

export default function SimpleBackdrop() {
  const context = React.useContext(AuthContext);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: "999" }} open={context.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
