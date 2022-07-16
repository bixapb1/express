import React from "react";
import { styled } from "@mui/material/styles";
import CardFood from "./CardFood";
import Snack from "./Snack";
import BasicModal from "./Modal";
import { Box, Paper, Button } from "@mui/material/";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addShops, addProducts } from "../redux/action";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const btnCompany = {
  width: "100%",
  fontSize: "1.4rem",
  color: "black",
  textTransform: "none",
};

function Shops() {
  const dispach = useDispatch();
  const { shops, products, order } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/shops")
      .then((response) => response.json())
      .then((data) => {
        dispach(addShops(data));
      });
  }, [dispach]);

  function chooseProduct(shop) {
    if (order.length !== 0) {
      setOpen(true);
    } else dispach(addProducts(shop.product));
  }

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4" gap={2}>
          {shops?.map((shop, i) => {
            return (
              <Item key={i} sx={{ margin: "5px 0" }}>
                <Button
                  onClick={() => chooseProduct(shop)}
                  variant="text"
                  sx={btnCompany}
                >
                  {shop.name}
                </Button>
              </Item>
            );
          })}
        </Box>
        <Box gridColumn="span 8" sx={{ margin: "0 60px" }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {products?.map((product) => {
              return (
                <Box gridColumn="span 4" key={product.id}>
                  <CardFood product={product} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <BasicModal open={open} setOpen={setOpen} />
      <Snack text={"Product added to cart!"} />
    </>
  );
}

export default Shops;
