import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { setSnackOpen } from "../redux/action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snack({ text }) {
  const dispach = useDispatch();
  const { snack } = useSelector((state) => state);
  return (
    <Snackbar
      open={snack}
      onClose={() => dispach(setSnackOpen(false))}
      autoHideDuration={1000}
    >
      <Alert severity="success">{text}</Alert>
    </Snackbar>
  );
}

export default Snack;
