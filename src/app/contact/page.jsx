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
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Get in Touch with Us
          </h2>
          <p className="text-gray-600">
            Feel free to reach out for any inquiries, suggestions, or feedback.
            We’d love to hear from you!
          </p>
          <div>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Email:</span>{" "}
              <a
                href="mailto:info@yourwebsite.com"
                className="text-green-500 hover:underline"
              >
                info@yourwebsite.com
              </a>
            </p>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Phone:</span> +123 456 7890
            </p>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Location:</span> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            >
              Send Message
            </button>
          </form>
          {/* Status Message */}
          {statusMessage && (
            <p
              className={`mt-4 text-center font-medium ${
                isSuccess ? "text-green-500" : "text-red-500"
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
