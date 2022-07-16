import "./style/App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "./redux/action";
import ShoppingCart from "./components/ShoppingCart";
import Shops from "./components/Shops";
import { AppBar, Toolbar, Box, Badge, Typography } from "@mui/material/";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import HistoryOrder from "./components/HistoryOrder";

const linkStyle = {
  color: "#fff",
  fontSize: "1.8rem",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

function App() {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("order"))) {
      const getLocalStorage = JSON.parse(localStorage.getItem("order"));
      dispatch(setOrder(getLocalStorage));
    }
  }, [dispatch]);

  return (
    <div>
      <AppBar component="nav">
        <Toolbar sx={{ gap: "30px", display: "flex", alignItems: "center" }}>
          <Link to="/" style={linkStyle}>
            <StoreIcon />
            <Typography>Shops</Typography>
          </Link>
          <Link to="/cart" style={linkStyle}>
            <Badge badgeContent={order.length} color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography>ShoppingCart</Typography>
          </Link>
          <Link to="/history" style={linkStyle}>
            <Typography>History</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, margin: "0 0 150px 0" }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Shops />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="/history" element={<HistoryOrder />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
