"use client";
import { AppShell, Burger, Group, Title, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title className="text-primary-600">Assefa Ayalew</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Dashboard" />
        <NavLink label="Projects" />
        <NavLink label="Blog" />
        <NavLink label="Testimonials" />
        <NavLink label="CV/Documents" />
        <NavLink label="Settings" />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Aside p="md">Aside content</AppShell.Aside>
      <AppShell.Footer p="md">Footer content</AppShell.Footer>
    </AppShell>
  );
}
