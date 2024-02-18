import React from "react";

const AllListings = () => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl">
      <img
        class="w-full"
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZXJuJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80"
        alt="Property Image"
      />
      <div class="px-6 py-4">
        <div class="mb-2">
          <h2 class="text-xl font-bold text-gray-900">
            PG For Boys in Sukalwad
          </h2>
          {/* <div class="flex items-center">
            <div class="mr-2 rounded-full bg-blue-600 py-1 px-2 text-xs font-medium text-white">
              sf
            </div>
            <div class="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white">
              sdfsd
            </div>
          </div> */}
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <img src="https://img.icons8.com/windows/24/null/bedroom.png" />
            <p class="ml-2 text-sm font-medium text-gray-700">Shared</p>
          </div>
          <div class="flex items-center">
            <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" />
            <p class="ml-2 text-sm font-medium text-gray-700">2 Bathrooms</p>
          </div>
          <div class="flex items-center">
            <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" />
            <p class="ml-2 text-sm font-medium text-gray-700">120 sqm</p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-extrabold text-blue-800">2400/month</p>
        </div>
      </div>
      {/* <div class="px-6 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Agent Image"
            class="mr-2 rounded-full object-cover"
          />
          <div>
            <p class="text-sm font-medium text-gray-800">Agent Name</p>
            <p class="text-xs text-gray-600">Real Estate Agent</p>
          </div>
        </div>
        <div class="flex">
          <a
            href="tel:+1234567890"
            class="mr-2 rounded-full bg-gray-300 p-1 text-gray-700 hover:text-gray-800"
          >
            <img src="https://img.icons8.com/color/24/null/ringer-volume.png" />
          </a>
          <a
            href="https://wa.me/1234567890"
            class="rounded-full bg-green-500 p-1 text-white hover:bg-green-600"
          >
            <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/null/external-WhatsApp-social-media-those-icons-lineal-color-those-icons.png" />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default AllListings;
