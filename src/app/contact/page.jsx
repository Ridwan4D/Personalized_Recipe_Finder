"use client";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const formRef = useRef();
  const [statusMessage, setStatusMessage] = useState(""); // State for status message
  const [isSuccess, setIsSuccess] = useState(null); // State for success or failure

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7k25jc1",
        "template_tpkhfgn",
        formRef.current,
        "9Kn8AUNmMdrNubQhs"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Message sent successfully!");
          setIsSuccess(true);
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          setStatusMessage("Failed to send the message. Please try again.");
          setIsSuccess(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100/30 py-16 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center border-2 rounded-lg bg-white shadow-xl p-2 md:p-10">
        {/* Left Side - Contact Info */}
        <div className="space-y-6 text-gray-800">
          <h2 className="text-4xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="text-lg text-gray-600">
            Have any questions or feedback? We would love to hear from you!
          </p>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@yourwebsite.com"
                className="text-blue-600 hover:underline"
              >
                info@yourwebsite.com
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Phone:</span> +123 456 7890
            </p>
            <p className="text-lg">
              <span className="font-semibold">Location:</span> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg mx-auto transform transition-all hover:scale-105">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              />
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-md font-semibold hover:bg-gradient-to-l hover:from-teal-500 hover:to-green-600 transition"
            >
              Send Message
            </button>
          </form>

          {/* Status Message */}
          {statusMessage && (
            <p
              className={`mt-4 text-center font-medium text-lg ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
