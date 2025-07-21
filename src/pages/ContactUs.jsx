import React from "react";

const Contact = () => {
  return (
    <div className="bg-orange-400 min-h-screen px-6 py-12 lg:px-24">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h2>
        <p className="text-lg text-gray-600">We're here to help you. Reach out anytime.</p>
      </div>

      {/* Contact Info & Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 text-white">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Email</h3>
            <ul className="list-disc list-inside space-y-1">
              <li >ceo@relhaninnovation.com</li>
              <li>hr@relhaninnovation.com</li>
              <li>support@relhaninnovation.com</li>
              <li>relhaninnovation@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Mobile</h3>
            <p>📞 +91-8222900173</p>
            <p>📞 +91-8708586099</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Location</h3>
            <p>Office Address: [Add your address here]</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-1">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.instagram.com" target="_blank" className="text-pink-600 hover:underline">Instagram</a>
              <a href="https://www.facebook.com" target="_blank" className="text-blue-700 hover:underline">Facebook</a>
              <a href="https://www.linkedin.com" target="_blank" className="text-blue-500 hover:underline">LinkedIn</a>
            </div>
          </div>

          <div className="mt-6">
            <a href="https://wa.me/918222900173" target="_blank" className="inline-block bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition">
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-blue-700">Send a Message</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>

      {/* CTA Buttons */}
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">📅 Book a Workshop</button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">🛒 Buy Now</button>
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">📁 Download Catalog</button>
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center text-sm text-gray-500">
        CONTACT US: +91-8222900173 | 🌐 www.relhaninnovation.com | ✉️ relhaninnovation@gmail.com
      </div>
    </div>
  );
};

export default Contact;
