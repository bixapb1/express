import React from "react";
import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { addHistory } from "../redux/action";
import CardHistory from "./CardHistory";
function HistoryOrder() {
  const dispach = useDispatch();
  const { history } = useSelector((state) => state);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        dispach(
          addHistory(
            data.filter((product) =>
              product.email.toLowerCase().includes(search.toLowerCase())
            )
          )
        );
      });
  }, [dispach, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 3"></Box>
        <Box gridColumn="span 6">
          <TextField
            id="search"
            label="Search by email"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleChange}
          />
        </Box>

        <Box gridColumn="span 3"></Box>
      </Box>

      {history.map((order) => {
        return (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            sx={{ marginTop: "30px" }}
            key={order.id}
          >
            <Box gridColumn="span 9">
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                {JSON.parse(order.order).map((product) => (
                  <Box gridColumn="span 3" key={product.name}>
                    <CardHistory key={product.name} product={product} />
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
              sx={{
                display: "flex",
                alignItems: "self-start",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography variant="h5" component="div">
                Order number: {order._id}
              </Typography>
              <Typography variant="h5" component="div">
                Name: {order.name}
              </Typography>
              <Typography variant="h5" component="div">
                Phone: {order.phone}
              </Typography>
              <Typography variant="h5" component="div">
                Email: {order.email}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default HistoryOrder;
