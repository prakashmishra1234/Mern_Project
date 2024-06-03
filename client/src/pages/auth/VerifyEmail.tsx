import React from "react";
import { AuthContext } from "../../Store";
import { ApiMethods } from "../../enum/ApiMethods";
import { getDataFromApi } from "../../api/CustomApiCall";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Paper, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";

const VerifyEmail = () => {
  const context = React.useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState<string>("");
  const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);

  const emailVerification = async () => {
    context.setLoading(true);
    const data = await getDataFromApi(
      `/api/v1/verifyEmail/${token}`,
      ApiMethods.GET
    );
    context.setLoading(false);
    if (data) {
      setMessage(data.message);
      setIsSuccess(data.success);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  React.useEffect(() => {
    emailVerification();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      navigateToLogin();
    }, 10000);
  }, []);

  return (
    <Grid
      container
      spacing={2}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {isSuccess !== null && (
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              m: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: "space-between",
            }}
            elevation={3}
          >
            {isSuccess ? (
              <VerifiedIcon sx={{ color: "green" }} />
            ) : (
              <NewReleasesIcon sx={{ color: "red" }} />
            )}
            <Typography fontWeight={700} color={isSuccess ? "black" : "red"}>
              {message}
            </Typography>
            <Button size="small" onClick={navigateToLogin}>
              Ok
            </Button>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default VerifyEmail;
