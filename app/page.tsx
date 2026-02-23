export default function Home() {
  return (
    <main className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Protect Your Family’s Future with Confidence
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          We help families and salaried professionals choose the right insurance —
          simple, transparent and stress-free.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition shadow-md">
            Get Free Consultation
          </button>

          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-50 transition">
            Talk on WhatsApp
          </button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Our Insurance Solutions
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Comprehensive protection plans designed to secure every stage of your life.
          </p>

          <div className="mt-16 grid md:grid-cols-4 gap-8">

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                Term Insurance
              </h3>
              <p className="text-gray-600 text-sm">
                Financial security for your family in case of unforeseen events.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                Health Insurance
              </h3>
              <p className="text-gray-600 text-sm">
                Coverage for medical expenses and hospitalisation support.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                Child Plans
              </h3>
              <p className="text-gray-600 text-sm">
                Secure your child’s education and future milestones.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">
                Retirement Planning
              </h3>
              <p className="text-gray-600 text-sm">
                Build a steady income stream for a stress-free retirement.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Families Trust Manthan Guru
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Personalized Guidance
            </h3>
            <p className="text-gray-600">
              Every family is unique. We recommend plans based on your goals,
              not sales targets.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Honest & Transparent Advice
            </h3>
            <p className="text-gray-600">
              Clear explanation of benefits, premiums and claims —
              no hidden surprises.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Long-Term Support
            </h3>
            <p className="text-gray-600">
              We stay connected even after purchase —
              renewals, claims and updates included.
            </p>
          </div>
        </div>
      </section>


      {/* EMOTIONAL CTA SECTION */}
      <section className="bg-blue-600 py-16 text-center text-white px-6">
        <h2 className="text-3xl font-bold">
          Because Your Family Deserves Financial Security
        </h2>

        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Let’s discuss your goals and build a protection plan that gives you peace of mind.
        </p>

        <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition shadow-md">
          Book a Free Call Today
        </button>
      </section>

    </main>
  );
}
