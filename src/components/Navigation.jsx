import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <menu class="pages-link">
        <ul>
          <li>
            <Link to="#">Studios</Link>
          </li>
          <li>
            <Link to="#">My Reservations</Link>
          </li>
          <li>
            <Link to="#">Add Studios</Link>
          </li>
          <li>
            <Link to="#">Delete Studios</Link>
          </li>
        </ul>
      </menu>
      <section class="auth-link">
        <ul>
          <li>
            <Link to="#">Log In</Link>
          </li>
          <li>
            <Link to="#">Sign Up</Link>
          </li>
          <li>
            <Link to="#">Log Out</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default Navigation;
