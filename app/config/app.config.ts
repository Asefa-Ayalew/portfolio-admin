import {
  IconFileAnalytics,
  IconGauge,
  IconUser,
  IconBriefcase,
  IconSettings,
  IconTools,
  IconPhone,
  IconCode,
  IconCup,
} from "@tabler/icons-react";

export const appConfig = [
  { label: "Dashboard", icon: IconGauge, link: "/dashboard" },
  { label: "Profile", icon: IconUser, link: "profile" },
  { label: "Education", icon: IconCup, link: "/education" },
  {
    label: "Projects",
    icon: IconBriefcase,
    links: [
      { label: "Ongoing Projects", link: "/projects/ongoing" },
      { label: "Completed Projects", link: "/projects/completed" },
    ],
  },
  {
    label: "Skills",
    icon: IconCode,
    links: [
      { label: "Technical Skills", link: "/skills/technical" },
      { label: "Soft Skills", link: "/skills/soft" },
    ],
  },
  { label: "Services", icon: IconTools, link: "services" },
  {
    label: "Contacts",
    icon: IconPhone,
    links: [
      { label: "Contact Requests", link: "/contact/requests" },
      { label: "Manage Social Links", link: "/contact/socials" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings,
    links: [
      { label: "Account Settings", link: "/settings/account" },
      { label: "Theme Customization", link: "/settings/theme" },
      { label: "Privacy & Security", link: "/settings/privacy" },
    ],
  },
];
