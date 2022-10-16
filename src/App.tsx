import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navigation, Teams } from "./pages";
import defaultTheme from "./styles/theme";

const App = () => {
  const theme = createTheme(defaultTheme);

  // update background color when theme changes
  React.useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="" element={<Teams />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* Print PDF iFrame */}
      <iframe id="print-pdf" title="print-pdf" style={{ display: "none" }} />
    </ThemeProvider>
  );
};

export default App;
