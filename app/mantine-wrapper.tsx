import { ColorSchemeScript, Loader, MantineProvider } from "@mantine/core";

import { Suspense } from "react";
import { theme } from "./shared/config/theme/theme";

interface RootStyleRegistryProps {
  readonly children: React.ReactNode;
}

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  console.log("children", children);
  return (
    <MantineProvider theme={theme}>
      <ColorSchemeScript />
      <Suspense fallback={<Loader />}>
        <>{children}</>
      </Suspense>
    </MantineProvider>
  );
}
