import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, IconButton } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ICustomDailog {
  handleClose: () => void;
  showTitle?: boolean;
  title?: string;
  open: boolean;
  dailogProps?: Partial<DialogProps>;
}

const CustomDailog: React.FC<React.PropsWithChildren<ICustomDailog>> = (
  props
) => {
  return (
    <React.Fragment>
      <Dialog
        {...props.dailogProps}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { minWidth: { md: "50%", xs: "90%" } } }}
      >
        {props.showTitle && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #e9e4e4",
              boxShadow: "0 4px 2px -2px #e9e4e4;",
            }}
          >
            {props.title && <DialogTitle>{props.title}</DialogTitle>}
            <IconButton onClick={props.handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        )}

        <DialogContent>
          <DialogContentText
            component={Box}
            id="alert-dialog-slide-description"
          >
            {props.children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomDailog;
