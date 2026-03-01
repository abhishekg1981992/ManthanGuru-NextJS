"use client";

import { useState } from "react";
import { sendEmail } from "../actions/sendEmail";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function validate(formData: FormData) {
    const newErrors: { name?: string; phone?: string } = {};

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    if (!name || name.length < 3) {
      newErrors.name = "Please enter a valid name (min 3 characters).";
    }

    const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    return newErrors;
  }

  async function handleSubmit(formData: FormData) {
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setIsSuccess(false);

    await sendEmail(formData);

    setIsSubmitting(false);
    setIsSuccess(true);

    // GA Event
    window.gtag?.("event", "form_submission", {
      event_category: "engagement",
      event_label: "Consultation Form",
    });
  }

  return (
    <div>
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          ✅ Thank you for your request. We will contact you shortly.
        </div>
      )}

      <form action={handleSubmit} className="space-y-6 text-left">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your 10-digit mobile number"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message (Optional)
          </label>
          <textarea
            name="message"
            rows={4}
            maxLength={500}
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