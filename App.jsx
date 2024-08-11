import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./app.css";
import { ThemeProvider } from "./contexts/themeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
