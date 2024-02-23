import { Routes, Route } from "react-router-dom";
import { Home, Header, Albums, About, Contacts, Shop, Events } from "./components";
import ReactPlay from "./components/Player/ReactPlayer";
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
      <Route
        exact
        path="/video/:videoUrl"
        element={
          <ReactPlay>
            <Header />
          </ReactPlay>
        }
      />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contacts" element={<Contacts />} />
      <Route exact path="/shop" element={<Shop />} />
      <Route exact path="/events" element={<Events />} />
    </Routes>
  );
};

export default App;
