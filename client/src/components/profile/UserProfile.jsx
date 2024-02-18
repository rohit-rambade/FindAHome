import React from "react";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
          <div className=" ">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-end">
                <FaEdit size={25} color="blue" />
              </div>
              <div className=" bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/94.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  ></img>
                  <h1 className="text-xl font-bold">Rohit Rambade</h1>
                  <p className="text-gray-700">Landlord</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                  Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                  luctus risus rhoncus id.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold mt-6 mb-4">Room Types</h2>
                  <ul className="flex space-x-4">
                    <li className=" p-2 shadow-lg  w-fit ">Single Room</li>
                    <li className=" p-2 shadow-lg  w-fit ">Shared Room</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mt-6 mb-4">Amenities</h2>
                  <ul className="flex space-x-4">
                    <li className=" p-2 shadow-lg  w-fit ">Hot Water</li>
                    <li className=" p-2 shadow-lg  w-fit">Tiffin</li>
                    <li className=" p-2 shadow-lg  w-fit">Internet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* {isEdit ? (
        <EditProfile />
      ) : (
        <div className=" ">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-end">
              <FaEdit
                size={25}
                color="blue"
                onClick={() => dispatch(setEditing(true))}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed finibus est vitae tortor ullamcorper, ut vestibulum
                velit convallis. Aenean posuere risus non velit egestas
                suscipit. Nunc finibus vel ante id euismod. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Aliquam erat volutpat. Nulla
                vulputate pharetra tellus, in luctus risus rhoncus id.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold mt-6 mb-4">
                  Room Types
                </h2>
                <ul className="flex space-x-4">
                  <li className=" p-2 shadow-lg  w-fit ">Single Room</li>
                  <li className=" p-2 shadow-lg  w-fit ">Shared Room</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mt-6 mb-4">Amenities</h2>
                <ul className="flex space-x-4">
                  <li className=" p-2 shadow-lg  w-fit ">Hot Water</li>
                  <li className=" p-2 shadow-lg  w-fit">Tiffin</li>
                  <li className=" p-2 shadow-lg  w-fit">Internet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )} */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
