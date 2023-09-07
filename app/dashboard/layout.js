import { Inter } from "next/font/google";
import Image from "next/image";
import { NextAuthProvider } from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DASHBOARD",
  description: "Application assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap content into auth provider */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
