import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-use";
import { useState, useEffect } from "react";

import Home from "../pages/Home/Home";
import Catalogue from "../pages/Catalogue/Catalogue";
import Pagenotfound from "../components/pagenotfound/Pagenotfound";
import Login from "../pages/Login/Login";
import Admin from "../interfaz/admin/Admin";
import Employee from "../interfaz/employee/Employee";
import Customer from "../interfaz/customer/Customer";
import RutaProtegida from "../utils/RutaProtegida";

function App() {
  const [inicioInactivo, setInicioInactivo] = useState(true)
  const [inicioActivo, setInicioActivo] = useState(false)
  const [infoLocalRol, setInfoLocalRol] = useState("");
  const location = useLocation()

  const activo = () => {
    const infoLocalToken = localStorage.getItem("token")
    const infoLocalRol = localStorage.getItem("rol")
  
    if (infoLocalToken) {
      setInicioInactivo(false)
      setInicioActivo(true)
      setInfoLocalRol(infoLocalRol);
    } else {
      setInicioInactivo(true)
      setInicioActivo(false)
    }
  }

  useEffect(() => {activo()}, [location])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<RutaProtegida pagActiva = {inicioInactivo} redirectPath={`/${infoLocalRol}`}  />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element = {<RutaProtegida pagActiva = {inicioActivo} redirectPath="/" />}>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Customer" element={<Customer />} />
        </Route>

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App