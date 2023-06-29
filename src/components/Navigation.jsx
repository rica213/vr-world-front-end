import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const isAdmin = useSelector(
    (state) => state.auth.user !== null && state.auth.user.admin === true
  );
  const isOpen = useSelector((state) => state.nav.isOpen);

  const navStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40vw",
    height: "100vh",
    transform: isOpen ? "none" : "translateX(-210px)",
    backgroundColor: "rgb(62, 62, 62)",
    transition: "all 1s",
  };

  return (
    <nav style={navStyle}>
      <ul className="pages-link">
        <li>
          <Link to="/studios">Studios</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/reservations">My Reservations</Link>
          </li>
        )}
        {isAdmin && (
          <>
            <li>
              <Link to="/studio/new">Add Studios</Link>
            </li>
            <li>
              <Link to="/studios/delete">Delete Studios</Link>
            </li>
          </>
        )}
      </ul>
      <section className="auth-link">
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          )}
        </ul>
      </section>
    </nav>
  );
};

export default Navigation;
