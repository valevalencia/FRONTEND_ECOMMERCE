import { Link, useLocation } from 'react-router-dom'
import { BsGear, BsNewspaper } from 'react-icons/bs'
import { useState } from 'react';
import { ProtectedRoute } from '../../context/Helpers/protectedRoute';
import { BrowserRouter, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import Dashboard from '../../pages/Dashboard/Dashboard'
import Provider from '../../pages/Provider/Provider'
import Warehause from '../../pages/Warehause/Warehause'
import Supply from '../../pages/Supply/Supply'
import Finish from '../../pages/Finish/Finish'
import SupplyCategory from '../../pages/SupplyCategory/SupplyCategory'
import UnitMesure from '../../pages/UnitMesure/UnitMesure'
import Role from '../../pages/Role/Role'
import TypeDocument from '../../pages/TypeDocument/TypeDocument'
import User from '../../pages/User/User'
import Login from '../../pages/Login/Login'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import ForgotPasswordEmail from '../../pages/ForgotPassword/ForgotPasswordEmail'
import TypeServices from '../../pages/TypeServices/TypeServices'
import SupplyPictogrmas from '../../pages/SupplyPictograms/SupplyPictograms'
import SupplyDetails from '../../pages/SupplyDetails/SupplyDetails'
import DashboardLayout from '../../layout/DashboardLayout'
import '../Base/Base.css'

function Sidebar () {
  const location = useLocation()
  const path = location.pathname

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mostrarSide = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const cerrarMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  const onClick = () => {
    const boton = document.getElementById('dropd')
    this.boton.classList.toggle('close');
  }

  return (
    
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <nav className={`sidebar ${sidebarOpen ? '' : 'cerrado'}`}>
        <div className="header">
          <div className="cont_logo">
            <img src="../../public/img/Logo.png" alt="Logo"></img>
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
            
            <Link to='/Supply'>
              <li>
                  <i class="icono fa-solid fa-basket-shopping"></i>
                  <span className="item">Insumos</span>
              </li>
            </Link>
            <Link to='/provider'>
              <li>
                  <i class="icono fa-solid fa-user-tie"></i>
                  <span className="item">Proveedores</span>
              </li>
            </Link>
            <Link to='/supplyDetails'>
              <li>
                  <i class="icono fa-solid fa-cart-shopping"></i>
                  <span className="item">Compras</span>
              </li>
            </Link>
            <Link to='/login'>
              <li className="logou">
                  <i class="icono fa-solid fa-arrow-left-long"></i>
                  <span className="item">Cerrar sesión</span>
              </li>
            </Link>
          </ul>
      </nav>
      <nav className={`navbare ${sidebarOpen ? '' : 'abierto'}`} id="navbar">
          <i onClick={mostrarSide} className="fa-solid fa-bars icono_menu"></i>
          <div className="perfil" onClick={onClick}>
            {/* <div className="dropd">
              <ul>
                <li><a href=""><i class="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión</a></li>
              </ul>
            </div> */}
          </div>
          {/* <img src="{% static 'Amin/img/GotaT.png' %}" style="position: absolute; top: 0; right: 0; width: 330px;" alt="fff"> */}
      </nav>
     

      
    </>
  )
}

export default Sidebar
