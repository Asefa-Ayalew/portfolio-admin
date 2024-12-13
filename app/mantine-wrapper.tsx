import { ColorSchemeScript, Loader, MantineProvider } from "@mantine/core";

import { Suspense } from "react";
import { theme } from "./shared/config/theme/theme";
import { Notifications } from "@mantine/notifications";

interface RootStyleRegistryProps {
  readonly children: React.ReactNode;
}

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  console.log("children", children);
  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" />
      <ColorSchemeScript />
      <Suspense fallback={<Loader size={30} />}>
        {children}
      </Suspense>
    </MantineProvider>
  );
}
