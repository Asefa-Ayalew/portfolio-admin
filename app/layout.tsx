import RootStyleRegistry from "./mantine-wrapper";
import { Inter } from "next/font/google"; // Google font import
import "./globals.css";
import Shell from "./shared/core/shell/shell";
import { AuthProvider } from "./shared/ui/context/auth-context";
// Import Google font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

export const metadata = {
  title: "My portfolio admin",
  description: "My personal portfolio from admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head></head>
      <body>
        <RootStyleRegistry>
          <AuthProvider>
            <Shell>{children}</Shell>
          </AuthProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
