import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addProduct } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProductModal from "../../Modal/AppProductModal";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRowClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddProductClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const successCallback = () => {
    console.log("Product added successfully:");
    handleCloseModal();
    dispatch(fetchProducts());
  };

  const handleAddProductSubmit = (productData) => {
    dispatch(
      addProduct({
        productData: productData,
        successCb: successCallback,
        errorCb: () => setOpenModal(false),
      })
    );
  };

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", margin: "30px" }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProductClick}
        >
          <AddIcon />
          Add Product
        </Button>
      </Box>
      {status === "loading" && <CircularProgress />}
      {products && products.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl/No</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product.id}
                    onClick={() => handleRowClick(product.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.product_price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {status === "failed" && (
            <Alert severity="error">Error in adding product!!.</Alert>
          )}
        </>
      ) : (
        <Alert severity="info">No products found</Alert>
      )}

      <AddProductModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleAddProductSubmit}
      />
    </section>
  );
};

export default ProductList;
