import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   mode: mode?.theme ?? "light",
  //   primary: primary,
  //   secondary: secondary,
  // },
  // components: {
  //   MuiTypography: {
  //     styleOverrides: {
  //       h4: {
  //         color: primary.dark,
  //       },
  //     },
  //   },
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: primary.main,
  //         "& label.Mui-focused": {
  //           // color: secondary.main,
  //         },
  //       },
  //     },
  //   },
  //   MuiSelect: {
  //     styleOverrides: {
  //       filled: {
  //         // backgroundColor: primary.main,
  //       },
  //     },
  //   },
  //   MuiFormControl: {
  //     styleOverrides: {
  //       root: {
  //         "& label.Mui-focused": {
  //           color: secondary.main,
  //         },
  //       },
  //     },
  //   },
  // },
});

export default responsiveFontSizes(theme);
