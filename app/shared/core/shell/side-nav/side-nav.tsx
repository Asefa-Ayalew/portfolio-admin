"use client";

import { Box, Divider, Group, ScrollArea } from "@mantine/core";
import LinksGroup from "./nav-bar-links-group";
import { appConfig } from "@/app/config/app.config";
import classes from "./side-nav.module.css";

export function SideNav() {
  const links = appConfig.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <Box className={classes.header}>
        <Group className="font-black text-green-600 text-xl items-center">
          Asefa Ayalew
        </Group>
      </Box>
      <Divider my="xs" />
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}

export default SideNav;
