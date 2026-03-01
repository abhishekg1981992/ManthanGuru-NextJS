"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f2]/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Manthan Guru Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-16 w-auto bg-[#f8f6f2]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-gray-700">
          <Link href="#services">Services</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>

          <a href="tel:+919810246109" className="font-semibold text-gray-800">
            📞 +91 98102 46109
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6 flex flex-col gap-4">

          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block w-full text-lg font-medium"
          >
            Services
          </Link>

          <Link
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block w-full text-lg font-medium"
          >
            About
          </Link>

          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-lg font-medium"
          >
            Contact
          </Link>

          <a
            href="tel:+919810246109"
            className="block w-full text-lg font-medium"
          >
            📞 Call Us
          </a>

          <a
            href="https://wa.me/919810246109"
            target="_blank"
            className="block w-full bg-green-500 text-white text-center py-3 rounded-full mt-2"
          >
            WhatsApp
          </a>

        </div>
      )}
    </header>
  );
}