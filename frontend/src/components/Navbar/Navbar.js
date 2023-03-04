import React, { useState } from "react";
// Style
import "./Navbar.css";

// Icons
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
// Hooks

import { useAuth } from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";

// Components
import { NavLink, Link } from "react-router-dom";
import { DarkMode } from "../DarkMode/DarkMode";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <nav id="nav">
      <Link to="/"> ReactGram </Link>
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <ul id="nav-links">
        <DarkMode />
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to={`/users/${user._id}`}>
                    <BsFillCameraFill />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile">
                    <BsFillPersonFill />
                  </NavLink>
                </li>
                <li>
                  <button className="logout">
                    <RiLogoutCircleRLine onClick={handleLogout} />
                  </button>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
