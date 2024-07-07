import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/categorySlice";
import PropTypes from 'prop-types';

const AddProductModal = ({ open, onClose, onSubmit }) => {
  AddProductModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,}
    
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImage_url] = useState("");
  const [categoryToggle, setCategoryToggle] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      product_name: productName,
      price,
      category_name: category,
      image_url,
    });
    setCategoryToggle(false)
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

const handleModalClose = () => {
  setProductName("");
  setPrice("");
  setCategory("");
  setImage_url("");
  setCategoryToggle(false);
  onClose();
};

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="add-product-modal"
      aria-describedby="modal-to-add-product"
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
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Product Name"
            variant="outlined"
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="number"
            label="Price"
            variant="outlined"
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {categoryToggle ? (
            <TextField
              required
              fullWidth
              label="category"
              variant="outlined"
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          ) : (
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.category_name}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
              <p style={{ cursor: "pointer" }}>
                Category not in the list ..?{" "}
                <span onClick={() => setCategoryToggle(true)}>
                  <u>click here</u>
                </span>{" "}
              </p>
            </FormControl>
          )}

          <TextField
            required
            fullWidth
            label="Image URL"
            variant="outlined"
            margin="normal"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
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

export default AddProductModal;
