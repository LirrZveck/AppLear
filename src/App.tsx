import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nuevaproduccion from "./components/nuevaproduccion/Nuevaproduccion";
import Produccionpendiente from "./components/produccionpendiente/Produccionpendiente";
import Informes from "./components/informes/Informes";
import Inicioproduccion from "./components/nuevaproduccion/inicioproduccion/Inicioproduccion";
import Finproduccion from "./components/nuevaproduccion/finproduccion/Finproduccion";
import Esperaproduccion from "./components/nuevaproduccion/esperaproduccion/Esperaproduccion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/nuevaproduccion" element={<Nuevaproduccion />} />
        <Route path="/produccionpendiente" element={<Produccionpendiente />} />
        <Route path="/informes" element={<Informes />} />
        <Route path="/Inicioproduccion" element={<Inicioproduccion />} />
        <Route path="/finproduccion" element={<Finproduccion />} />
        <Route path="/esperaproduccion" element={<Esperaproduccion />} />
      </Routes>
    </Router>
  );
}

export default App;
