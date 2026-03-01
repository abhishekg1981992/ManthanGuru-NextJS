"use client";

export default function HeroButtons() {
  const trackWhatsApp = () => {
    window.gtag?.("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: "Hero WhatsApp Button",
    });
  };

  const trackConsultation = () => {
    window.gtag?.("event", "consultation_click", {
      event_category: "engagement",
      event_label: "Hero Consultation Button",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">

      <a
        href="#contact"
        onClick={trackConsultation}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition text-center"
      >
        Get Free Consultation
      </a>

      <a
        href="https://wa.me/919810246109?text=Hi%20Manthan%20Guru,%20I%20would%20like%20to%20know%20more%20about%20insurance%20plans."
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsApp}
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition text-center"
      >
        Talk on WhatsApp
      </a>

    </div>
  );
}