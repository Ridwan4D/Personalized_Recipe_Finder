import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/Footer";
import AuthProvider from "@/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import SearchBar from "@/component/SearchBar/SearchBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Personalized Recipe Finder",
    template: "%s | Personalized Recipe Finder",
  },
  description: "Personalized Recipe Finder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1600px] mx-auto`}
        >
          <Navbar />
          <SearchBar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
