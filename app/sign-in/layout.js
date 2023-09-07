import { Inter } from "next/font/google";
import Image from "next/image";
import { NextAuthProvider } from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIGN IN",
  description: "Application assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
