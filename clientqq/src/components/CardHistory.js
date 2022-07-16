import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ product }) {
  const { name, price, quantity, src } = product;
  return (
    <Card sx={{ maxWidth: 345 }} key={name}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="fit-content"
          image={src}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {quantity} x {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
