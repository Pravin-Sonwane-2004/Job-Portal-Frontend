import React from 'react';
import { Container } from '@mantine/core';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 pt-8 pb-8 relative">
      <Container style={{ maxWidth: '1800px' }}>
        {/* Footer Bottom */}
        <div className="border-t border-slate-300 dark:border-slate-700 mt-16 pt-10 text-sm text-slate-600 dark:text-slate-400">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
            {/* Company Info */}
            <div>
              <h4 className="text-indigo-600 dark:text-indigo-400 text-lg font-bold mb-4">Job Portal</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Empowering careers and companies through innovation and technology.
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-indigo-600 dark:text-indigo-400 text-lg font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</a></li>
                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</a></li>
                <li><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Blog</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-indigo-600 dark:text-indigo-400 text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-slate-700 dark:text-slate-300">Co Founder: Pravin Ashok Sonwane</p>
              <p className="text-slate-700 dark:text-slate-300">Sadegaon Tq Ambad Dis Jalna</p>
              <p className="text-slate-700 dark:text-slate-300">Email: pravinson222@gmail.com</p>
              <p className="text-slate-700 dark:text-slate-300">Phone: 91+ 9322559215</p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-indigo-600 dark:text-indigo-400 text-lg font-bold mb-4">Subscribe</h4>
              <p className="mb-2 text-slate-600 dark:text-slate-400">Get the latest job updates.</p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="border-t border-slate-300 dark:border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 gap-4 text-center">
            <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} Job Portal. All rights reserved by pravin.</p>
            <div className="flex gap-4">
            {/* Social Icons */}
            <a href="https://github.com/Pravin2004P" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <img src="/social/github.png" alt="GitHub" className="h-6 filter dark:invert" />
            </a>
              <a href="https://www.linkedin.com/in/pravin-sonwane" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src="/social/linkedin.png" alt="LinkedIn" className="h-6 filter dark:invert" />
              </a>
              <a href="https://www.instagram.com/its.pravin.2004  " target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src="/social/instagram.png" alt="Instagram" className="h-6 filter dark:invert" />
              </a>

            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
