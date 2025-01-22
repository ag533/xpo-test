import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import BrandCard from "../components/BrandCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../redux/brandSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Brand, Exhibitor } from "../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { brands, loading, error } = useSelector((state: RootState) => state.brands);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  const [open, setOpen] = useState(false);
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  const handleSearch = (results: Brand[]) => {
    setFilteredBrands(results.length > 0 ? results : brands);
  };

  const handleCardClick = (exhibitor: Exhibitor) => {
    setSelectedExhibitor(exhibitor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExhibitor(null);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
        <Typography variant="h4">Exhibitor Brands</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/admin")}>
          Go to Admin
        </Button>
      </Box>

      <SearchBar onSearch={handleSearch} />

      <div
        style={{
          columnCount: 4,
          columnGap: "16px",
        }}
      >
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <div key={brand.BrandID} style={{ breakInside: "avoid", marginBottom: "16px" }} onClick={() => handleCardClick(brand.exhibitor)}>
              <BrandCard brand={brand} onClick={handleCardClick}/>
            </div>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4, textAlign: "center", width: "100%" }}>
            No brands found
          </Typography>
        )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Exhibitor Details</DialogTitle>
        <DialogContent>
          {selectedExhibitor && (
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Company:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '16px' }}>
                {selectedExhibitor.company}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Name:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '16px' }}>
                {selectedExhibitor.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Position:
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '16px' }}>
                {selectedExhibitor.position}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                Profile Picture:
              </Typography>
              <img src={selectedExhibitor.profile_picture} alt="Profile" style={{ width: '100px', height: '100px' }} />
            </Grid>
            { !!!selectedExhibitor.ExhibitorID && <Typography>No assoicated Exhibitor</Typography> }  
          </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;