import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-[#f8f6f2]/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">



            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-16 flex items-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Manthan Guru Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-16 w-auto bg-[#f8f6f2]"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-12 text-gray-700 text-[15px]">

              <Link href="#services" className="relative group font-medium tracking-wide">
                Services
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link href="#about" className="relative group font-medium tracking-wide">
                About
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link href="#contact" className="relative group font-medium tracking-wide">
                Contact
                <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <div className="flex items-center gap-6 ml-6">
                <span className="text-gray-600 font-semibold text-sm">
                  📞 +91 98102 46109
                </span>

                <a
                  href="https://wa.me/919810246109"
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition shadow-sm"
                >
                  WhatsApp
                </a>
              </div>

            </nav>

          </div>
        </header>




        {children}

      </body>
    </html>
  );
}
