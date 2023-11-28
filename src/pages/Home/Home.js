import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import loginImg from "../../assets/login.svg";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { ShowOnLogout } from "../../components/protect/hiddenLink";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="container hero"
        style={{ backgroundColor: `${colors.primary[500]}` }}
      >
        <div className="hero-text">
          <h1 style={{ color: `${colors.grey[100]}` }}>ezCompliance Software Solution</h1>
          <p style={{ color: `${colors.grey[100]}` }}>ISO Compliance System (ICS)</p>
          <p style={{ color: `${colors.grey[100]}` }}>
            A management system standard which sets out the requirements and provides
            guidelines for establishing, developing, implementing, evaluating,
            maintaining, and continually improving a compliance management system (CMS).
          </p>
          <div className="hero-buttons --flex-start">
            <ShowOnLogout>
              <button className="--btn --btn-danger">
                <Link to={"/register"}>Register</Link>
              </button>
              <button className="--btn --btn-primary2">
                <Link to={"/login"}>Login</Link>
              </button>
            </ShowOnLogout>
          </div>
        </div>

        <div className="hero-image">
          <img src={loginImg} alt="Inventory" />
        </div>
      </section>
    </>
  );
};

export default Home;
