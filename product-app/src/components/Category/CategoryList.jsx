import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, fetchCategories } from "../../store/categorySlice";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddCategoryModal from "../../Modal/AddCategoryModal";
const CategoryListing = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategoryClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const successCallback = () => {
    console.log("Category added successfully:");
    handleCloseModal();
    dispatch(fetchCategories());
  };

  const handleAddCategorySubmit = (Data) => {
    dispatch(
      addCategory({
        Data: Data,
        successCb: successCallback,
        errorCb: () => setOpenModal(false),
      })
    );
  };
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          mt: 4,
        }}
      >
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
            Categories
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategoryClick}
          >
            <AddIcon />
            Add Category
          </Button>
        </Box>
        <Paper>
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl/No</TableCell>
                  <TableCell>Category Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {status === "loading" && <CircularProgress />}
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{category.category_name}</TableCell>
                    </TableRow>
                  ))}
                {status === "succeeded" && categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No categories found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {status === "failed" && (
            <Alert severity="error">Error in adding category!!.</Alert>
          )}
        </Paper>
      </Box>
      <AddCategoryModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleAddCategorySubmit}
      />
    </>
  );
};

export default CategoryListing;
