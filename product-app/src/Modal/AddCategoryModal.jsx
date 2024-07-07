import { useState } from "react";
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} 
from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const AddCategoryModal = ({ open, onClose, onSubmit }) => {
  AddCategoryModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,}
    
const [category,setCategory]=useState("")
 
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      category_name:category
    });
  };

  
const handleModalClose = () => {
  setCategory("")
  
  onClose();
};

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="add-category-modal"
      aria-describedby="modal-to-add-category"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Category"
            variant="outlined"
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          
          <Button type="submit" variant="contained" color="primary">
            <AddIcon />
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
