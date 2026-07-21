import "./App.css";
import Home from "./Pages/Home/Home";
import Maps from "./Pages/Maps/Maps";
import SpellInfo from "./Pages/SpellInfo/SpellInfo";
import Spells from "./Pages/Spells/Spells";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/Spells" element={<Spells />} />
        <Route path="/Spell/:spellName" element={<SpellInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
