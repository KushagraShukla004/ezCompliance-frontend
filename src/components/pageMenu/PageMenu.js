import React from "react";
import { NavLink } from "react-router-dom";
import {
  AdminAuditorForms,
  AdminAuditorLink,
  AdminLink,
} from "../protect/hiddenLink";

const PageMenu = () => {
  return (
    <div>
      <nav className="--btn-primary3 --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/change-password">Change Password</NavLink>
          </li>
          <li>
            <NavLink to="/addResource">Add Resource</NavLink>
          </li>
          <AdminLink>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
          </AdminLink>
          <AdminAuditorLink>
            <li>
              <NavLink to="/allForms">All Forms</NavLink>
            </li>
          </AdminAuditorLink>
          <AdminLink>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
          </AdminLink>
        </ul>
      </nav>
    </div>
  );
};

export default PageMenu;
