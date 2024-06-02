import { Pagination } from "@mui/material";
import React from "react";

interface IPagination {
  count: number;
  page: number;
  handleChange: (e: React.ChangeEvent<unknown>, newPage: any) => void;
}

const CustomPagination: React.FC<IPagination> = (props) => {
  return (
    <Pagination
      count={props.count}
      variant="outlined"
      shape="rounded"
      page={props.page}
      onChange={props.handleChange}
    />
  );
};

export default CustomPagination;
