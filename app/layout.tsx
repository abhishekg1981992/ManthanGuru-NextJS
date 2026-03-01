import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header"; // we’ll create this
import Script from "next/script";
import WhatsAppButton from "./components/WhatsAppButton";
// export const metadata = {
//   title: "Manthan Guru | Insurance Guidance for Families",
//   description: "Trusted insurance advice for families and salaried professionals.",
// };

export const metadata = {
  title: "Insurance Advisor Since 2004 | Term & Health Insurance Consultant | Manthan Guru",
  description:
    "Trusted insurance advisor serving salaried individuals and business owners since 2004. Expert guidance on term insurance, health insurance, and financial protection planning.",
  openGraph: {
    title:
      "Insurance Advisor Since 2004 | Term & Health Insurance Consultant | Manthan Guru",
    description:
      "Serving families since 2004. Personalized insurance planning for salaried professionals and business owners.",
    url: "https://www.manthanguru.com",
    siteName: "Manthan Guru",
    type: "website",
    icons: {
      icon: "./../public/logo.png",
    }
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H275RMS3YS"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H275RMS3YS');
          `}
        </Script>
        <Script
          id="schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "InsuranceAgency",
              "name": "Manthan Guru",
              "url": "https://www.manthanguru.com",
              "founder": {
                "@type": "Person",
                "name": "Arun Kumar Gupta"
              },
              "foundingDate": "2004-01-01",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9810246109",
                "contactType": "customer service"
              }
            }
            `}
        </Script>
        <Header />
        {children}
        <WhatsAppButton />
        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 py-16 px-6 mt-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

            {/* Brand */}
            <div>
              <h3 className="text-xl font-semibold text-white">
                Manthan Guru
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                Trusted insurance guidance for salaried individuals and business owners.
                Serving families since 2004 under the leadership of
                <span className="text-white font-medium"> Mr. Arun Kumar Gupta</span>.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  📞 <a href="tel:+919810246109" className="hover:text-white transition">
                    +91 98102 46109
                  </a>
                </li>
                <li>
                  ✉️ <a href="mailto:arungupta2009@yahoo.com" className="hover:text-white transition">
                    arungupta2009@yahoo.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919810246109"
                    target="_blank"
                    className="text-green-400 hover:text-green-300 transition"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Line */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Manthan Guru. All rights reserved.
          </div>
        </footer>
        {/* Floating WhatsApp Button
        <a
          href="https://wa.me/919810246109?text=Hi%20Manthan%20Guru,%20I%20would%20like%20to%20know%20more%20about%20insurance%20plans."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // @ts-ignore
            window.gtag?.('event', 'whatsapp_click', {
              event_category: 'engagement',
              event_label: 'Floating WhatsApp Button',
            });
          }}
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
        </a> */}
      </body>
    </html>
  );
}