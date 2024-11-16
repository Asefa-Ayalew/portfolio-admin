import {
  IconFileAnalytics,
  IconGauge,
  IconUser,
  IconBriefcase,
  IconSettings,
  IconTools,
  IconPhone,
  IconCode,
} from "@tabler/icons-react";

export const appConfig = [
  { label: "Dashboard", icon: IconGauge, link: "/admin/dashboard" },
  {
    label: "Profile",
    icon: IconUser,
    initiallyOpened: false,
    links: [
      { label: "View Profile", link: "/admin/profile/view" },
      { label: "Edit Profile", link: "/admin/profile/edit" },
      { label: "Resume", link: "/admin/profile/resume" },
    ],
  },
  {
    label: "Projects",
    icon: IconBriefcase,
    links: [
      { label: "Ongoing Projects", link: "/admin/projects/ongoing" },
      { label: "Completed Projects", link: "/admin/projects/completed" },
      { label: "Add New Project", link: "/admin/projects/new" },
    ],
  },
  {
    label: "Skills",
    icon: IconCode,
    links: [
      { label: "Technical Skills", link: "/admin/skills/technical" },
      { label: "Soft Skills", link: "/admin/skills/soft" },
      { label: "Add New Skill", link: "/admin/skills/new" },
    ],
  },
  {
    label: "Services",
    icon: IconTools,
    links: [
      { label: "Available Services", link: "/admin/services/list" },
      { label: "Add New Service", link: "/admin/services/new" },
    ],
  },
  {
    label: "Analytics",
    icon: IconFileAnalytics,
    links: [
      { label: "Traffic Overview", link: "/admin/analytics/traffic" },
      { label: "Project Insights", link: "/admin/analytics/projects" },
      { label: "User Engagement", link: "/admin/analytics/engagement" },
    ],
  },
  {
    label: "Contact Me",
    icon: IconPhone,
    links: [
      { label: "Contact Requests", link: "/admin/contact/requests" },
      { label: "Manage Social Links", link: "/admin/contact/socials" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings,
    links: [
      { label: "Account Settings", link: "/admin/settings/account" },
      { label: "Theme Customization", link: "/admin/settings/theme" },
      { label: "Privacy & Security", link: "/admin/settings/privacy" },
    ],
  },
];
