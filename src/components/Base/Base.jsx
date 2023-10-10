import './Base.css';
// import {imagenEjemplo} from '../../dist/img/LOGO.png'; // Ajusta la ruta según la ubicación real de tu imagen

import { Inicio } from "../Inicio/Inicio";
import { Link,BrowserRouter, Routes, Route } from "react-router-dom";
import { Usuario } from "../Usuario/Usuario";
import { Producto } from "../Producto/Producto";
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mostrarSide = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const cerrarMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
    return (
      <BrowserRouter>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <nav className={`sidebar ${sidebarOpen ? '' : 'cerrado'}`}>
          <div className="header">
            <div className="cont_logo">
              {/* <span>{ nombre }</span> */}
              <img src="./src/dist/img/LOGO.png'" alt="fff"></img>
            </div>
            <div className="contM">
              {/* <img src="{% static 'Amin/img/logoMovil.png' %}" alt="fff"> */}
            </div>
            <i onClick={cerrarMenu} className="fa-solid fa-xmark ico_cerrar"></i>
          </div>

          <ul className="menu">
            <Link to='/'>
              <li>
                  <i className="icono fa-solid fa-border-all"></i>
                  <span className="item">Inicio</span>
              </li>
            </Link>
            <Link to='/Usuarios'>
              <li>
                  <i className="icono fa-solid fa-border-all"></i>
                  <span className="item">Usuarios</span>
              </li>
            </Link>
            <Link to='/Productos'>
              <li>
                  <i className="icono fa-solid fa-border-all"></i>
                  <span className="item">Productos</span>
              </li>
            </Link>
            <Link to='/Productos'>
              <li>
                  <i className="icono fa-solid fa-border-all"></i>
                  <span className="item">Productos</span>
              </li>
            </Link>
          </ul>
        </nav>
        <nav className={`navbare ${sidebarOpen ? '' : 'abierto'}`} id="navbar">
          <i onClick={mostrarSide} className="fa-solid fa-bars icono_menu"></i>
          <div className="perfil">  
            <div className="dropd close">
              <ul>
                  {/* <li><a href="{% url 'perfil' %}"><i class='bx bx-user'></i> Perfil</a></li>
                  <li><a href="{% url 'logout' %}"><i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión</a></li> */}
              </ul>
            </div>
          </div>
          {/* <img src="{% static 'Amin/img/GotaT.png' %}" style="position: absolute; top: 0; right: 0; width: 330px;" alt="fff"> */}
        </nav>
        <section className="home-section" id="home-section">
          <div className={`home-content ${sidebarOpen ? '' : 'abiert'}`} id="home-content">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/Usuarios" element={<Usuario />} />
                <Route path="/Productos" element={<Producto />} />
              </Routes>
          </div>
        </section>
        
      
      </BrowserRouter>
    );
  };
  
  

export default App