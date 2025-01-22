import React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const BrandCard = ({ brand, onClick }) => {
  return (
    <Card
      sx={{
        border: "1px solid transparent",
        transition: "transform 0.3s, border-color 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          borderColor: "primary.main",
        },
      }}
      onClick={onClick}
    >
      <CardMedia component="img" height="140" image={brand.image_url} />
      <CardContent>
        <Typography variant="h5">{brand.brand_name}</Typography>
        <Typography>{brand.description}</Typography>
        <Button
          onClick={onClick}
          sx={{
            transition: "color 0.3s",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          Exhibitor
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrandCard;