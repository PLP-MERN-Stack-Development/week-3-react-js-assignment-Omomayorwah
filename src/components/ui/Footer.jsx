// src/components/Footer.jsx
import React from 'react';

const Footer = ({ companyName, links, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">{companyName || 'Your Brand'}</h2>
            <p className="text-sm text-gray-400">
              © {currentYear} {companyName || 'Your Company'}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {links?.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="font-semibold mb-2">{section.title}</h3>
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex} 
                    href={link.url} 
                    className="text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            {socialLinks && (
              <div className="flex flex-col">
                <h3 className="font-semibold mb-2">Connect</h3>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="text-gray-300 hover:text-white"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;