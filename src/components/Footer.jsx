
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300 mt-auto">
      {/* Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-content p-2.5 rounded-xl shadow-md hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-wide">
                Dev<span className="text-primary">Tinder</span>
              </h3>
              <p className="text-sm text-base-content/60">
                Connect. Collaborate. Code.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <nav className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-base-100 shadow-sm hover:bg-neutral hover:text-neutral-content hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="currentColor"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.74 2.23 3.38 1.7.1-.73.39-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.62 5.21-5.11 5.49.4.35.75 1.03.75 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-base-100 shadow-sm hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="currentColor"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.53v16.94c0 .85.69 1.53 1.55 1.53h16.9c.86 0 1.55-.68 1.55-1.53V3.53c0-.85-.69-1.53-1.55-1.53zM8.09 18.34H5.12V9h2.97v9.34zM6.6 7.73a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zm12.3 10.61h-2.97v-4.54c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.62H9.73V9h2.85v1.28h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57v5.03z" />
              </svg>
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-base-300/70 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-base-content/60">
          <p>
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
          <p>
            Made with <span className="text-red-500">♥</span> for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
