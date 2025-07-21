import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaCode,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 px-4 py-5 border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-end text-center space-y-4">
        <FaCode className="text-4xl text-blue-500" />
        <div>
          <p className="font-bold text-lg">DevTinder Inc.</p>
          <p className="text-sm text-gray-200">
            Made with 💜 by developers, for developers.
          </p>
          <p className="text-xs mt-1 text-gray-500">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
        <div className="flex gap-6 text-2xl text-gray-400 mt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-400 transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-600 transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-500 transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
