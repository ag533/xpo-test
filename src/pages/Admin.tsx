import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { setBrands } from "../redux/brandSlice";
import BrandCard from "../components/BrandCard";
import { Brand, Exhibitor } from "../types";
import { addBrand, addExhibitor } from "../services/api";

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector((state: RootState) => state.brands.brands);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [isAddingBrand, setIsAddingBrand] = useState(true);
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({});
  const [newExhibitor, setNewExhibitor] = useState<Partial<Exhibitor>>({});

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(brands);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setBrands(items));
  };

  const handleCardClick = (exhibitor: Exhibitor) => {
    setSelectedExhibitor(exhibitor);
    setOpen(true);
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

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddingBrand) {
      setNewBrand({ ...newBrand, [e.target.name]: e.target.value });
    } else {
      setNewExhibitor({ ...newExhibitor, [e.target.name]: e.target.value });
    }
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="brands" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {brands.map((brand, index) => (
                <Draggable key={brand.BrandID} draggableId={brand.BrandID} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ ...provided.draggableProps.style }}
                      onClick={() => handleCardClick(brand.exhibitor)}
                    >
                      <BrandCard brand={brand} onClick={handleCardClick} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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
    </Container>
  );
};

export default Admin;