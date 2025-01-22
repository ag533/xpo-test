import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import React from "react";

const BrandForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Brand Name" {...register("brand_name")} required />
      <TextField label="Image URL" {...register("brands_image")} required />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default BrandForm;
