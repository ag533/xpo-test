import { TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import { searchBrands } from "../services/api";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState({
    name: "",
    product_tag: "",
    location: "",
    hall: "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value)
    );
    const results = await searchBrands(filteredQuery);
    onSearch(results);
  };

  const handleClear = () => {
    setQuery({
      name: "",
      product_tag: "",
      location: "",
      hall: "",
    });
    onSearch([]);
  };

  return (
    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={query.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Product Tag"
          variant="outlined"
          fullWidth
          name="product_tag"
          value={query.product_tag}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          name="location"
          value={query.location}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Hall"
          variant="outlined"
          fullWidth
          name="hall"
          value={query.hall}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
          Search
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button variant="outlined" color="secondary" fullWidth onClick={handleClear}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;