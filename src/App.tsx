import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { lightTheme, darkTheme } from "./theme";
import { RootState } from "./store";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

const App = () => {
  const { themeMode } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;
