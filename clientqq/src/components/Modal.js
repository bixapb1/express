import * as React from "react";
import { Modal, Box, Button, Typography } from "@mui/material/";
import { useDispatch } from "react-redux";
import { setOrder } from "../redux/action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
  const dispach = useDispatch();
  const handleClose = () => setOpen(false);
  const clearBasket = () => {
    setOpen(false);
    dispach(setOrder([]));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            You can only shop in one store!
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="h5"
            component="h2"
            sx={{ mt: 2 }}
          >
            You want to clear the shopping cart and start shopping in another
            store?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              paddingTop: "10px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => handleClose()}
            >
              Сontinue shopping
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => clearBasket()}
            >
              Сlear the basket
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
