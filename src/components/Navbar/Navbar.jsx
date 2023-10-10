import { Link, useNavigate } from 'react-router-dom'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons//io'
import { useState, useRef, useEffect } from 'react';

function Navbar () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // Referencia al elemento del menú

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);  // Cierra el menú si se hace clic fuera de él
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // Agrega un event listener para detectar clics fuera del componente
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Limpia el event listener cuando el componente se desmonta
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <></>
  )
}

export default Navbar
