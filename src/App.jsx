import { Routes, Route } from "react-router-dom";
import { Home, Header, Albums } from "./components";
import ReactPlay from "./components/ReactPlayer";
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/albums"
        element={
          <Albums>
            <Header />
          </Albums>
        }
      />
      <Route exact path='/video/:videoUrl' element={<ReactPlay><Header/></ReactPlay>}/>
    </Routes>
  );
};

export default App;
