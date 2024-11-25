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
  {
    label: "Profile",
    icon: IconUser,
    initiallyOpened: false,
    links: [
      { label: "View Profile", link: "/profile/view" },
      { label: "Edit Profile", link: "/profile/edit" },
      { label: "Resume", link: "/profile/resume" },
    ],
  },
  { label: "Education", icon: IconCup, link: "/education" },
  {
    label: "Projects",
    icon: IconBriefcase,
    links: [
      { label: "Ongoing Projects", link: "/projects/ongoing" },
      { label: "Completed Projects", link: "/projects/completed" },
      { label: "Add New Project", link: "/projects/new" },
    ],
  },
  {
    label: "Skills",
    icon: IconCode,
    links: [
      { label: "Technical Skills", link: "/skills/technical" },
      { label: "Soft Skills", link: "/skills/soft" },
      { label: "Add New Skill", link: "/skills/new" },
    ],
  },
  {
    label: "Services",
    icon: IconTools,
    links: [
      { label: "Available Services", link: "/services/list" },
      { label: "Add New Service", link: "/services/new" },
    ],
  },
  {
    label: "Analytics",
    icon: IconFileAnalytics,
    links: [
      { label: "Traffic Overview", link: "/analytics/traffic" },
      { label: "Project Insights", link: "/analytics/projects" },
      { label: "User Engagement", link: "/analytics/engagement" },
    ],
  },
  {
    label: "Contact Me",
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
