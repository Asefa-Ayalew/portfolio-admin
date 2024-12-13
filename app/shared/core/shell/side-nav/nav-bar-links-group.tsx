"use client";

import { useState, useEffect } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from "./nav-bar-links-group.module.css";

interface LinksGroupProps {
  readonly icon: React.ElementType; // Icon component
  readonly label: string; // Label of the group
  readonly initiallyOpened?: boolean; // Determines if the group is initially opened
  readonly link?: string; // Direct link for the group
  readonly links?: { label: string; link: string }[]; // Sub-links for the group
}

function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const [opened, setOpened] = useState(initiallyOpened ?? false); // Default to false if initiallyOpened is undefined
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();
  const hasLinks = Array.isArray(links) && links.length > 0; // Check if there are sub-links

  // Check if the current path matches the parent route
  const isParentActive = link ? pathname.startsWith(link) : false;

  // Check if any child link matches the current path or its sub-route
  const isChildActive =
    hasLinks &&
    links.some((subLink) => pathname.startsWith(subLink.link));

  // Use `useEffect` to open the collapse if any child link is active
  useEffect(() => {
    if (hasLinks) {
      setOpened(isChildActive || !!initiallyOpened); // Open collapse if any child is active
    }
  }, [pathname, links, hasLinks, initiallyOpened, isChildActive]);

  // Generate sub-links items, marking active ones
  const items = hasLinks
    ? links.map((subLink) => {
        const isActive = pathname.startsWith(subLink.link); // Check if the sub-link or its sub-route is active
        return (
          <Box
            key={subLink.label}
            className={`${classes.link} ${
              isActive ? "bg-gray-300 text-white" : "text-gray-700"
            }`}
          >
            <Link href={subLink.link} className={classes.linkText}>
              {subLink.label}
            </Link>
          </Box>
        );
      })
    : null;

  return (
    <>
    <UnstyledButton
  onClick={() => {
    if (!hasLinks && link) {
      // Use client-side routing
      router.push(link);
    } else {
      // Toggle the collapse for menus with submenus
      setOpened((o) => !o);
    }
  }}
  className={`${classes.control} ${
    isParentActive && !hasLinks ? "bg-gray-300 text-white" : "text-gray-700"
  }`}
  aria-expanded={opened} // Add ARIA attribute for accessibility
>
  <Group justify="space-between" className="w-full mr-0">
    <Box style={{ display: "flex", alignItems: "center" }}>
      <ThemeIcon variant="light" size={30}>
        <Icon style={{ width: rem(18), height: rem(18) }} />
      </ThemeIcon>
      <Box ml="md">{label}</Box>
    </Box>
    {hasLinks && (
      <IconChevronRight
        className={classes.chevron}
        stroke={1.5}
        style={{
          width: rem(16),
          height: rem(16),
          transform: opened ? "rotate(-90deg)" : "none",
        }}
      />
    )}
  </Group>
</UnstyledButton>

      {/* Render the collapse for sub-links */}
      {hasLinks && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}

export default LinksGroup;
