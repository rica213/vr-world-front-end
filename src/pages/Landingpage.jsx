import React from 'react';
import '../styles/Landingpage.css';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiFillHome } from 'react-icons/ai';
import { IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Landingpage = () => (
  <>
    <div className="landingpage-wrapper">
      <HiMenuAlt4 className="humbg" />
      <div className="mid">
        <div className="header">
          <h1>VR WORLD</h1>
        </div>
        <div className="btn-box">
          <Link class="home-link" to="/home">
            <button type="button" className="landingpage-home-btn">
              <AiFillHome />
              Start Journey
              <IoIosArrowDropright />
            </button>
          </Link>
        </div>
      </div>
    </div>
    <img src="/soc-icons/Social-Icons-white-vertical.png" alt="" className="soc-down" />
  </>
);

export default Landingpage;
