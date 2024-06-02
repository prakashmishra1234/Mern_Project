import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { SearchModel, SearchSchema } from "../../type/SearchType";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBar {
  handleSubmit: (value: SearchModel) => void;
}
const SearchBar: React.FC<ISearchBar> = (props) => {
  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },
    validationSchema: SearchSchema,
    onSubmit: props.handleSubmit,
  });

  return (
    <Box
      display={"flex"}
      id={"searchField"}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        fullWidth
        size="small"
        name="searchValue"
        id="searchValue"
        label="Search users"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {formik.values.searchValue !== "" && (
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    formik.setFieldValue("searchValue", "");
                    props.handleSubmit({ searchValue: "" });
                  }}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        disabled={formik.values.searchValue === ""}
        form="searchField"
        sx={{ ml: 2 }}
        variant="outlined"
        size="small"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
