import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../store/productSlice";
import { Box, CircularProgress, Typography, Alert, Paper } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products.productDetails);
  const detailsStatus = useSelector((state) => state.products.detailsStatus);
  const detailsError = useSelector((state) => state.products.detailsError);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  if (detailsStatus === "loading") {
    return <CircularProgress />;
  }

  if (detailsStatus === "failed") {
    return <Alert severity="error">{detailsError}</Alert>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: "700px",
        maxHeight: "500px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", }}>
        {productDetails.product_name}
      </Typography>
      <hr></hr>
      <Typography variant="body1" sx={{ textAlign: "center",mt: 6 }}>
        <strong>Price:</strong> ${productDetails.product_price}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <strong>Category:</strong> {productDetails.category}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
         
        }}
      >
        <img
          src={productDetails.image}
          alt={productDetails.product_name}
          style={{ maxWidth: "400px", height: "300px" }}
        />
      </Box>
    </Paper>
  );
};

export default ProductDetails;
