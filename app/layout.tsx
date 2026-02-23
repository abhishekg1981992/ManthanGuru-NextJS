import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header"; // we’ll create this

export const metadata = {
  title: "Manthan Guru | Insurance Guidance for Families",
  description: "Trusted insurance advice for families and salaried professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Header />
        {children}
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919810246109?text=Hi%20Manthan%20Guru,%20I%20would%20like%20to%20know%20more%20about%20insurance%20plans."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M20.52 3.48A11.91 11.91 0 0012.06 0C5.48 0 .12 5.36.12 11.94c0 2.1.55 4.15 1.6 5.97L0 24l6.24-1.63a11.91 11.91 0 005.82 1.49h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.49-8.44z" />
          </svg>
        </a>
      </body>
    </html>
  );
}