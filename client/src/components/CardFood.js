import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material/";
import { addToOrder, deleteToOrder } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
function CardFood({ product, grupBtn }) {
  const dispach = useDispatch();
  const { order } = useSelector((state) => state);

  return (
    <>
      <Card sx={{ maxWidth: 340 }}>
        <CardMedia
          component="img"
          height="fit-content"
          image={product.src}
          alt={product.name}
          crossorigin="anonymous"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name} <br /> {product.price}$
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
          {grupBtn ? (
            <>
              <RemoveShoppingCartIcon
                onClick={() => deleteToOrder(product, order, dispach)}
              />
              <Typography variant="h5">{product.quantity}</Typography>
              <AddShoppingCartIcon
                onClick={() => addToOrder(product, order, dispach)}
              />
            </>
          ) : (
            <Button
              onClick={() => addToOrder(product, order, dispach)}
              sx={{ color: "black", width: "100%" }}
              size="small"
            >
              Add to cart
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default CardFood;
