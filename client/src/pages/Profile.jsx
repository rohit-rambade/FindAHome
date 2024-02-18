import React from "react";
// import { FaEdit } from "react-icons/fa";
// import EditProfile from "../components/profile/EditProfile";
// import { useDispatch, useSelector } from "react-redux";
// import { setEditing } from "../slices/userSlice";
import SideBar from "../components/profile/SideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  // const isEdit = useSelector((state) => state.user.isEditing);
  // const dispatch = useDispatch();
  // const handleEdit = () => {
  //   console.log("on btn click");
  //   dispatch(setEditing(true));
  // };
  return (
    <div className=" flex flex-col md:flex-row">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Profile;
