import { Routes, Route } from "react-router-dom";
import { Home, Header } from "./components";
const App = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home>
            <Header />
          </Home>
        }
      />
    </Routes>
  );
};

export default App;
