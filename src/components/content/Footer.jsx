import React from 'react';
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaCode
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-base-200 text-neutral-content px-4 py-5">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-end text-center space-y-6">
        <FaCode className="text-4xl" />
        <div>
          <p className="font-bold text-lg">DevTinder Inc.</p>
          <p className="text-sm">Connecting Developers since 2025</p>
          <p className="text-xs mt-1">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
        <div className="flex gap-6 text-2xl mt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
