import { Box } from "@mantine/core";
import React from "react";
import HeaderMenu from "./header-menu";
import DateTimeDisplay from "./date-time-display";

const Header = () => {
  return (
    <Box className="bg-white font-bold h-12 content-center text-gray-800 pl-2 justify-between flex">
     <DateTimeDisplay />
      <HeaderMenu />
    </Box>
  );
};

export default Header;
