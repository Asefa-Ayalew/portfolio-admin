import { Box } from "@mantine/core";
import React from "react";
import HeaderMenu from "./header-menu";

const Header = () => {
  return (
    <Box className="bg-white font-bold h-12 content-center text-gray-800 pl-2 justify-between flex">
     <Box className="flex space-x-2 content-center mt-2">
     <h1 className="text-lg">My portfolio:</h1>
      <p className="mt-1">
        Crafting Seamless Personal portfolio with React, Mantine and
        TailwindCSS
      </p>
     </Box>
      <HeaderMenu />
    </Box>
  );
};

export default Header;
