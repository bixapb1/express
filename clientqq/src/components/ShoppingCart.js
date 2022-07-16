import React from "react";
import { Box, Typography } from "@mui/material/";
import { useSelector } from "react-redux";
import CardFood from "./CardFood";
import Form from "./Form";
import Snack from "./Snack";
const footerStyle = {
  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  color: "white",
  height: "70px",
  background: "#1976d2",
  alignItems: "center",
};

function ShoppingCart() {
  const { order } = useSelector((state) => state);
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box
        gridColumn="span 4"
        sx={{
          padding: "20px",
          background: "#0e101c2b",
          borderRadius: "30px",
          height: "fit-content",
        }}
      >
        <Form />
      </Box>
      <Box gridColumn="span 8" sx={{ margin: "0 60px" }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          {order.map((product) => {
            return (
              <Box gridColumn="span 4" key={product.id}>
                <CardFood product={product} grupBtn={true} />
              </Box>
            );
          })}
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={5}
          sx={footerStyle}
        >
          <Box gridColumn="span 4" sx={{ margin: "0 auto" }}></Box>
          <Box gridColumn="span 8" sx={{ margin: "0 60px" }}>
            {" "}
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Total cost:{" "}
              {order.reduce((acc, item) => {
                return acc + item.price * item.quantity;
              }, 0)}
              $
            </Typography>
          </Box>
        </Box>
      </Box>
      <Snack text={"Thanks for your order!"} />
    </Box>
  );
}

export default ShoppingCart;
