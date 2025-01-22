import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";

interface BrandCardProp {
  brand: any,
  onClick: any,
  onEdit?: any,
};

const BrandCard = ({ brand, onClick, onEdit }: BrandCardProp) => {
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
        <Typography><b>Description:</b> {brand.description}</Typography>
        <Typography><b>Hall:</b> {brand.hall}</Typography>
        <Typography><b>Stand:</b> {brand.stand_number}</Typography>
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
        {onEdit && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(brand);
              }}
            >
              Edit
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BrandCard;