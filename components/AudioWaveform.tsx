'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AudioWaveform = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const bars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real-Time Voice Processing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience crystal-clear voice recognition with our advanced AI technology
          </p>
        </motion.div>

        {/* Audio Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center items-end space-x-1 sm:space-x-2 h-24 sm:h-32 mb-12 sm:mb-16 px-4"
        >
          {bars.map((bar) => (
            <motion.div
              key={bar}
              className="bg-gradient-to-t from-teal-500 to-blue-500 rounded-full"
              style={{
                width: `${3 + Math.random() * 6}px`,
              }}
              animate={{
                height: [
                  `${15 + Math.random() * 45}px`,
                  `${30 + Math.random() * 60}px`,
                  `${15 + Math.random() * 45}px`,
                ],
              }}
              transition={{
                duration: 0.5 + Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Real-time Processing",
              description: "Instant voice recognition and response generation",
              icon: "⚡",
            },
            {
              title: "Natural Language",
              description: "Human-like conversations with context awareness",
              icon: "🧠",
            },
            {
              title: "Multi-language",
              description: "Support for 40+ languages and dialects",
              icon: "🌍",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-4 sm:p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-teal-500/50 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};