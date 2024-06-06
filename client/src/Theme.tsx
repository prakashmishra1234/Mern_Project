import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { LOCAL_STORAGE_KEY } from "./constant";

const primary = {
  main: "#fff",
  dark: "#fff",
  light: "",
};

const secondary = {
  main: "#000",
  dark: "",
  light: "",
};

const mode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);

const theme = createTheme({
  palette: {
    mode: mode?.theme ?? "light",
    primary: primary,
    secondary: secondary,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: primary.dark,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: primary.main,
          "& label.Mui-focused": {
            // color: secondary.main,
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        filled: {
          // backgroundColor: primary.main,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: secondary.main,
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
