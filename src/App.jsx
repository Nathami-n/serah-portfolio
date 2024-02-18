import { Routes, Route } from "react-router-dom";
import { Home, Header, Albums } from "./components";
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
      <Route exact path="/Albums" element={<Albums><Header/></Albums>} />
    </Routes>
  );
};

export default App;
