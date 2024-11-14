import RootStyleRegistry from "./mantine-wrapper";
import { Inter } from "next/font/google"; // Google font import
import { Shell } from "./components/shell";
import "./globals.css";
// Import Google font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
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
          <Shell>{children}</Shell>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
