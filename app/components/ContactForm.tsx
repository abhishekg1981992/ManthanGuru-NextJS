"use client";

import { useState } from "react";
import { sendEmail } from "../actions/sendEmail";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setIsSuccess(false);

    await sendEmail(formData);

    setIsSubmitting(false);
    setIsSuccess(true);
  }

  return (
    <div>
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          ✅ Thank you for your request. We will contact you shortly.
        </div>
      )}

      <form action={handleSubmit} className="space-y-6 text-left">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            required
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            required
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Tell us briefly about your requirement"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full transition disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Request Consultation"}
        </button>

      </form>
    </div>
  );
}