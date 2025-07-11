'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import { Mic, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Marquee } from '../Marquee';

export const ShapeLandingHero = () => {
  const [mounted, setMounted] = useState(false);
  const [shapePositions, setShapePositions] = useState<Array<{left: string; top: string}>>([]);

  const floatingShapes = [
    { size: 'w-20 h-20', delay: 0, duration: 6, color: 'bg-teal-500/20' },
    { size: 'w-16 h-16', delay: 1, duration: 8, color: 'bg-blue-500/20' },
    { size: 'w-12 h-12', delay: 2, duration: 5, color: 'bg-indigo-500/20' },
    { size: 'w-24 h-24', delay: 0.5, duration: 7, color: 'bg-purple-500/20' },
  ];

  useEffect(() => {
    setMounted(true);
    setShapePositions([
      { left: '10%', top: '20%' },
      { left: '80%', top: '30%' },
      { left: '20%', top: '70%' },
      { left: '70%', top: '80%' },
    ]);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        {mounted && floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full ${shape.size} ${shape.color} blur-xl`}
            style={{
              left: shapePositions[index]?.left || '0%',
              top: shapePositions[index]?.top || '0%',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Icon Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center space-x-4 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-teal-500/20 backdrop-blur-sm rounded-2xl border border-teal-500/30"
            >
              <Mic className="w-8 h-8 text-teal-400" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-2xl border border-blue-500/30"
            >
              <Sparkles className="w-8 h-8 text-blue-400" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-indigo-500/20 backdrop-blur-sm rounded-2xl border border-indigo-500/30"
            >
              <Zap className="w-8 h-8 text-indigo-400" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight px-4"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Next-Gen
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Voice AI
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Transform your business with intelligent voice interactions. 
            Experience the future of customer engagement today.
          </motion.p>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl shadow-teal-500/25"
              >
                <Mic className="w-5 h-5 mr-2" />
                Try Voice AI Now
              </Button>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white font-medium px-6 py-3 rounded-full border border-gray-600 hover:border-gray-400 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-12"
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by industry leaders</p>
            <div className="flex justify-center items-center space-x-8 opacity-60 mb-8">
              {/* Company logo placeholders */}
              <div className="h-8 w-24 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400 font-semibold">TechCorp</span>
              </div>
              <div className="h-8 w-20 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400 font-semibold">DataFlow</span>
              </div>
              <div className="h-8 w-28 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400 font-semibold">InnovateLab</span>
              </div>
              <div className="h-8 w-22 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400 font-semibold">CloudTech</span>
              </div>
            </div>
            
            {/* Marquee Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-8"
            >
              <Marquee
                items={[
                  "🚀 Real-time Voice Processing",
                  "🌍 Multi-language Support", 
                  "⚡ 24/7 AI Availability",
                  "🔒 Enterprise Security",
                  "🎯 Custom Voice Training",
                  "📊 Analytics & Insights",
                  "🔗 Seamless Integration",
                  "🌐 Global Infrastructure",
                  "🎤 Natural Conversations",
                  "📱 Mobile Optimized"
                ]}
                speed={25}
                className="border-t border-b border-gray-700 py-6 bg-gradient-to-r from-gray-800/20 via-gray-700/10 to-gray-800/20"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-teal-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};