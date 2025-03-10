import React from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom"; // Used for nested routing
import Footer from "./components/Footer";
import theme from './theme';

const MainLayout = () => {
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {/* Main Content */}

        <Outlet /> {/* Renders the matched route's component */}


      {/* Sticky Footer */}
      <Footer />
      </ThemeProvider>
  );
};

export default MainLayout;
