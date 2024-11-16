"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Menu, Group, Center, Avatar } from "@mantine/core";
import {
  IconUser,
  IconKey,
  IconSettings,
  IconQuestionMark,
  IconHelp,
  IconLogout,
  IconChevronDown,
  IconLanguage,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./header-menu.module.css";

// Define types for menu items
interface MenuItem {
  label: string;
  link?: string;
  icon: React.ReactNode;
  action?: () => void;
}

export function HeaderMenu() {
  const { t, i18n } = useTranslation();

  // Ensure the default language is set to English when the component mounts
  useEffect(() => {
    if (!i18n.language) {
      // i18n?.changeLanguage("en"); // Default language is English
    }
  }, [i18n]);

  // Language change function
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);  // Switch to the selected language
  };

  // Define language menu items
  const languageMenu: MenuItem[] = [
    {
      label: "English",
      action: () => changeLanguage("en"),
      icon: <IconLanguage size="1rem" />,
    },
    {
      label: "Amharic",
      action: () => changeLanguage("am"),
      icon: <IconLanguage size="1rem" />,
    },
  ];

  // Define user menu items
  const userMenu: (MenuItem | "divider")[] = [
    {
      label: t("profile"),
      link: "/admin/profile",
      icon: <IconUser size="1rem" />,
    },
    {
      label: t("change_password"),
      link: "/admin/change-password",
      icon: <IconKey size="1rem" />,
    },
    {
      label: t("settings"),
      link: "/admin/settings",
      icon: <IconSettings size="1rem" />,
    },
    "divider", // Divider after settings
    {
      label: t("faq"),
      link: "/admin/faq",
      icon: <IconQuestionMark size="1rem" />,
    },
    {
      label: t("help"),
      link: "/admin/help",
      icon: <IconHelp size="1rem" />,
    },
    "divider", // Divider after help
    {
      label: t("logout"),
      action: () => console.log("Logging out..."),
      icon: <IconLogout size="1rem" />,
    },
  ];

  // Render the menu items dynamically
  const renderMenuItems = (menuItems: (MenuItem | "divider")[]) =>
    menuItems.map((item, index) => renderMenuItem(item, index));

  const renderMenuItem = (item: MenuItem | "divider", index: number) => {
    if (item === "divider") {
      return <Menu.Divider key={`divider-${index}`} />;
    }

    const content = (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {item.icon}
        {item.label}
      </div>
    );

    if (item.action) {
      return (
        <Menu.Item key={item.label} onClick={item.action}>
          {content}
        </Menu.Item>
      );
    }

    return (
      <Menu.Item key={item.label} component={Link} href={item.link!}>
        {content}
      </Menu.Item>
    );
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group gap={5} className="space-x-2 mr-4 justify-center">
          {/* Language Menu */}
          <Menu
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <Menu.Target>
              <Link
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <IconLanguage size="1rem" />
                  <span className={classes.linkLabel}>
                    {i18n.language === "en" ? "English" : "Amharic"}
                  </span>
                  <IconChevronDown size="0.9rem" />
                </Center>
              </Link>
            </Menu.Target>
            <Menu.Dropdown>{renderMenuItems(languageMenu)}</Menu.Dropdown>
          </Menu>

          {/* User Menu */}
          <Menu
            trigger="hover"
            transitionProps={{ exitDuration: 0 }}
            withinPortal
          >
            <Menu.Target>
              <Link
                href="#"
                className={classes.link}
                onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <Avatar radius="xl" size="sm" />
                  <span className={classes.linkLabel}>{t("user")}</span>
                  <IconChevronDown size="0.9rem" />
                </Center>
              </Link>
            </Menu.Target>
            <Menu.Dropdown>{renderMenuItems(userMenu)}</Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </header>
  );
}

export default HeaderMenu;
