import React from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="">
      <aside class=" top-0 left-0 z-40 md:w-64">
        <div class="h-full px-3 py-4 overflow-y-auto ">
          <ul class="flex flex-wrap justify-center items-center md:items-start md:flex-col md:space-y-2 font-medium">
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 rounded-lg space-x-2"
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="listings"
                className="flex items-center p-2 rounded-lg space-x-2"
              >
                <FaHome />
                <span>Listings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
