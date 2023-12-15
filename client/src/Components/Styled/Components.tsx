import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const LoginInputs = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {},
  "& MuiInputBase-input": {},
}));
