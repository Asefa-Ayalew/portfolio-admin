import React, { ReactNode } from "react";
import SideNav from "./side-nav/side-nav";
import Header from "./header/header";
import { Box } from "@mantine/core";

interface ShellProps {
  children: ReactNode;
}

const Shell = ({ children }: ShellProps) => {
  return (
    <Box className="flex">
      <Box className="w-1/6">
        <SideNav />
      </Box>
      <Box className="w-5/6">
        <Header />
        <main>{children}</main>
      </Box>
    </Box>
  );
};

export default Shell;
