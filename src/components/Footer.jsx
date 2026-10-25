
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">

        {/* Main Footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div className="max-w-md">
            <a
              href="/"
              className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 text-xl shadow-lg shadow-violet-500/20">
                D
              </span>
              <span>
                Dev<span className="text-violet-400">Tinder</span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Connect with developers, build meaningful connections,
              and grow together in your coding journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Explore
            </h3>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <a href="/feed" className="transition hover:text-violet-400">
                Discover
              </a>
              <a href="/connections" className="transition hover:text-violet-400">
                Connections
              </a>
              <a href="/profile" className="transition hover:text-violet-400">
                Profile
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Connect with us
            </h3>

            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-violet-400 hover:bg-violet-500/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.71 2.63 1.22 3.27.93.1-.72.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.72.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-500/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.5H4.98V9h2.95v9.5ZM6.46 7.7a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.5h-2.94v-4.62c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.77 1.19-1.77 2.43v4.7H9.82V9h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.54 1.95 3.54 4.49v5.23Z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-8.04L5 22H1.87l7.25-8.29L.8 2h6.4l4.43 7.38L18.9 2Zm-1.1 17.86h1.73L6.28 4.03H4.43L17.8 19.86Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>

          <p>
            Made with <span className="text-pink-500">♥</span> for the
            developer community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
