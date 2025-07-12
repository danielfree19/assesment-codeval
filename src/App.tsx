import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./errorBoundary";
import theme from "./theme";
import Main from "./Pages/main";
import { useEffect } from "react";
import useStore from "./Store";
import './App.css';

const App = () => {
  const store = useStore();
  
  // load items on page load
  useEffect(() => {
    store.getItems()
  },[store]);

  return (
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
          console.error('Error logged:', error, info);
        }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Main/>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
