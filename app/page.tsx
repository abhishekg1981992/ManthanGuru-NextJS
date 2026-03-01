import { sendEmail } from "./actions/sendEmail";
import ContactForm from "./components/ContactForm";

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

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-[#f8f6f2]">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Families who trusted us with their financial protection.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm">
                “Manthan Guru helped us choose the right term plan without confusion.
                The entire process was transparent and stress-free.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">
                – Rajesh Sharma
              </h4>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm">
                “Their guidance in selecting health insurance for my family was
                extremely helpful. Highly professional service.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">
                – Neha Verma
              </h4>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-600 text-sm">
                “I appreciate the long-term support even after purchasing the policy.
                Truly reliable and trustworthy advisors.”
              </p>
              <h4 className="mt-4 font-semibold text-gray-800">
                – Amit Gupta
              </h4>
            </div>

          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* Founder Image */}
          <div className="flex justify-center">
            <div className="w-72 h-72 bg-gray-200 rounded-xl overflow-hidden shadow-md">
              <img
                src="/founder.jpg"
                alt="Mr. Arun Kumar Gupta - Founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Founder Content */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full mb-4">
              Serving Families Since 2004
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
              Meet Mr. Arun Kumar Gupta
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Mr. Arun Kumar Gupta began his journey in the insurance industry on
              <strong> 1st January 2004</strong>. With over
              <strong> 22 years of dedicated experience</strong>, he has helped
              hundreds of families secure their financial future through honest advice
              and long-term relationships.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              At Manthan Guru, insurance is not about selling policies —
              it’s about understanding responsibilities, future goals, and protecting
              what matters most to your family.
            </p>

            <div className="mt-8">
              <a
                href="https://wa.me/919810246109"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition"
              >
                Speak Directly with Mr. Gupta
              </a>
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
        <h2>
          Ready to Secure Your Family’s Future?
        </h2>

        <p>
          Speak with Mr. Arun Kumar Gupta today and take the first step toward financial peace of mind.
        </p>

        <a
          href="#contact"
          className="mt-6 inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Book a Free Consultation
        </a>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-8">

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                How much life insurance cover do I actually need?
              </h3>
              <p className="mt-2 text-gray-600">
                The required coverage depends on your income, liabilities, financial goals,
                and family responsibilities. We analyze your complete financial profile
                before recommending any plan.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Is term insurance better than traditional plans?
              </h3>
              <p className="mt-2 text-gray-600">
                For pure protection needs, term insurance is often the most cost-effective
                solution. However, every individual’s situation is different, and we
                guide you based on your goals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                I am a business owner. Do I need separate insurance planning?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes. Business owners often require customized coverage for income
                protection, liability, and future succession planning. We structure
                solutions aligned with your business risks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Will you assist during claim settlement?
              </h3>
              <p className="mt-2 text-gray-600">
                Absolutely. Our relationship does not end at policy purchase.
                We actively support families during claims and renewals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Do you charge consultation fees?
              </h3>
              <p className="mt-2 text-gray-600">
                Our initial consultation is completely free. We focus on understanding
                your needs first before recommending any product.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-[#f8f6f2]">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Book a Free Consultation
          </h2>

          <p className="mt-4 text-gray-600">
            Get personalized guidance tailored to your family's financial needs.
          </p>

          <div className="mt-12">
            <ContactForm />
          </div>

        </div>
      </section>

    </main>
  );
}
