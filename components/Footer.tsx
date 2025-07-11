'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const footerLinks = {
    Product: ['Features', 'Pricing', 'API Docs', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-4">
                YallaTalk
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming businesses with next-generation voice AI technology. 
                Experience the future of customer interaction today.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-teal-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            © 2024 YallaTalk. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors duration-300">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};