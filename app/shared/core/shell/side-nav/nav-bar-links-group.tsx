"use client";

import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link"; // Ensure you import Link for client-side navigation
import classes from "./nav-bar-links-group.module.css";

interface LinksGroupProps {
  readonly icon: React.ElementType; // Changed from React.ReactNode to React.ElementType
  readonly label: string;
  readonly initiallyOpened?: boolean;
  readonly link?: string; // The main link for the group
  readonly links?: { label: string; link: string }[]; // Sub-links for the group
}

function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links); // Check if there are sub-links
  const [opened, setOpened] = useState(initiallyOpened || false);

  // Generate sub-links if they exist
  const items = (hasLinks ? links : []).map((link) => (
    <Box key={link.label} className={classes.link}>
      <Link href={link.link} className={classes.linkText}>
        {link.label}
      </Link>
    </Box>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)} // Toggle the collapse for sub-links
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">
              {link ? (
                // If a `link` exists, render it as a direct Link
                <Link href={link} className={classes.linkText}>
                  {label}
                </Link>
              ) : (
                // Otherwise, just display the label
                label
              )}
            </Box>
          </Box>
          {hasLinks && (
            // Render the chevron if the group has sub-links
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none", // Rotate the chevron if open
              }}
            />
          )}
        </Group>
      </UnstyledButton>

      {/* If there are sub-links, show the collapse */}
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}

export default LinksGroup;
