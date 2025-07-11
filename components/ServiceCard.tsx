'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  delay?: number;
}

export const ServiceCard = ({ title, description, icon, features, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-teal-500/50 transition-all duration-300 group">
        <CardHeader className="text-center">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button 
              variant="outline" 
              className="w-full border-gray-600 text-gray-300 hover:bg-teal-500/10 hover:border-teal-500 hover:text-teal-400 transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};