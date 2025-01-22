import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setBrands } from "../redux/brandSlice";
import BrandCard from "../components/BrandCard";
import { Brand, Exhibitor } from "../types";
import { addBrand, addExhibitor, editBrand, editExhibitor } from "../services/api";
import { getBrands } from "../redux/brandSlice";
import { RootState, AppDispatch } from "../redux/store";

const Admin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((state: RootState) => state.brands.brands);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isAddingBrand, setIsAddingBrand] = useState(true);
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({});
  const [newExhibitor, setNewExhibitor] = useState<Partial<Exhibitor>>({});
  const [editedBrand, setEditedBrand] = useState<Partial<Brand>>({});
  const [editedExhibitor, setEditedExhibitor] = useState<Partial<Exhibitor>>({});

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleCardClick = (exhibitor: Exhibitor) => {
    setSelectedExhibitor(exhibitor);
    setOpen(true);
  };

  const handleEditClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setEditedBrand(brand);
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExhibitor(null);
  };

  const handleAddOpen = (isBrand: boolean) => {
    setIsAddingBrand(isBrand);
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setNewBrand({});
    setNewExhibitor({});
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedBrand(null);
    setEditedBrand({});
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddingBrand) {
      setNewBrand({ ...newBrand, [e.target.name]: e.target.value });
    } else {
      setNewExhibitor({ ...newExhibitor, [e.target.name]: e.target.value });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBrand({ ...editedBrand, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    if (isAddingBrand) {
      try {
        const response = await addBrand(newBrand);
        dispatch(setBrands([...brands, response.data]));
        handleAddClose();
      } catch (error) {
        console.error("Failed to add brand:", error);
      }
    } else {
      try {
        const response = await addExhibitor(newExhibitor);
        handleAddClose();
      } catch (error) {
        console.error("Failed to add exhibitor:", error);
      }
    }
  };

  const handleEditSubmit = async () => {
    if (selectedBrand) {
      try {
        const response = await editBrand(selectedBrand.BrandID, editedBrand);
        const updatedBrands = brands.map((brand) =>
          brand.BrandID === selectedBrand.BrandID ? response.data : brand
        );
        dispatch(setBrands(updatedBrands));
        handleEditClose();
      } catch (error) {
        console.error("Failed to edit brand:", error);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
        <Typography variant="h4">Admin Panel</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleAddOpen(true)} sx={{ mr: 2 }}>
            Add Brand
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleAddOpen(false)} sx={{ mr: 2 }}>
            Add Exhibitor
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Box>
      </Box>
      <div
        style={{
          columnCount: 4,
          columnGap: "16px",
        }}
      >
        {brands.map((brand) => (
          <div key={brand.BrandID} style={{ breakInside: "avoid", marginBottom: "16px" }} onClick={() => handleCardClick(brand.exhibitor)}>
            <BrandCard brand={brand} onClick={handleCardClick} onEdit={handleEditClick} />
          </div>
        ))}
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
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>{isAddingBrand ? "Add Brand" : "Add Exhibitor"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {isAddingBrand ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Brand Name"
                    name="brand_name"
                    value={newBrand.brand_name || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image URL"
                    name="image_url"
                    value={newBrand.image_url || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Stand Number"
                    name="stand_number"
                    value={newBrand.stand_number || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={newBrand.description || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Product Tag"
                    name="product_tag"
                    value={newBrand.product_tag || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    name="location"
                    value={newBrand.location || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Hall"
                    name="hall"
                    value={newBrand.hall || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Exhibitor ID"
                    name="exhibitor_id"
                    value={newBrand.exhibitor_id || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    value={newExhibitor.name || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Profile Picture URL"
                    name="profile_picture"
                    value={newExhibitor.profile_picture || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Position"
                    name="position"
                    value={newExhibitor.position || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Company"
                    name="company"
                    value={newExhibitor.company || ""}
                    onChange={handleAddChange}
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Brand</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Brand Name"
                name="brand_name"
                value={editedBrand.brand_name || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="image_url"
                value={editedBrand.image_url || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stand Number"
                name="stand_number"
                value={editedBrand.stand_number || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={editedBrand.description || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Tag"
                name="product_tag"
                value={editedBrand.product_tag || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={editedBrand.location || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hall"
                name="hall"
                value={editedBrand.hall || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Exhibitor ID"
                name="exhibitor_id"
                value={editedBrand.exhibitor_id || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;