import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 pt-12 pb-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <span className="text-xl font-semibold text-white">Suvidha AI</span>
          </div>
          <p className="text-sm text-gray-400">
            Your smart summarizer for articles, documents, and more. Powered by AI, built for clarity.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/summarizer" className="hover:text-white transition">Summarizer</a></li>
            <li><a href="/history" className="hover:text-white transition">Summary History</a></li>
            <li><a href="/articles" className="hover:text-white transition">Article History</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-400">📧 support@suvidha.ai</p>
          <p className="text-sm text-gray-400">📍 Moradabad, Uttar Pradesh</p>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded bg-gray-800 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-6"></div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto text-center text-xs text-gray-500 space-y-1">
        <p>© 2025 Suvidha AI. All rights reserved.</p>
        <p>Developed by <span className="text-white font-medium">Abhay Pratap Singh</span> — Bareilly, Uttar Pradesh</p>
        <p>📞 Contact: <span className="text-white font-medium">+91-XXXXXXXXXX</span></p>
      </div>
    </footer>
  );
};

export default Footer;