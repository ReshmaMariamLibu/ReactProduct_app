import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static"  sx={{ width: '100%', marginBottom: 4 }}>
      <Toolbar>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/products">
            Products
          </Button>
          <Button color="inherit" component={RouterLink} to="/categories">
            Categories
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
