import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/index";
import ProductListing from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import CategoryListing from "./components/Category/CategoryList";
import theme from "./theme";
import Box from '@mui/material/Box';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box 
            component="main" 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              width: '100%', 
              mt: 4 
            }}
          >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<CategoryListing />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  </ThemeProvider>
  );
};


export default App;
