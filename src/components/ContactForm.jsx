import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

  emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  form.current,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)

      .then(
        () => {
          setSent(true);
          setError(null);
          form.current.reset();
        },
        (err) => {
          setError('❌ Failed to send message. Please try again.');
          console.error(err);
        }
      );
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">📬 Contact Form</h3>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Your Name</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email Address</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
        >
          Send Message
        </button>
        {sent && <p className="text-green-400 text-sm mt-2">✅ Message sent successfully!</p>}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;