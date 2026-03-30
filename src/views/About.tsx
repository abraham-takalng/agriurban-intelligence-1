import React from 'react';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Globe, 
  Github, 
  Linkedin, 
  Mail,
  Award,
  BookOpen,
  Code
} from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.3em] mb-4">The Project</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Pioneering Agri-Urban <br/> Resilience in Bale Robe</h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            AgriUrban Intelligence is a next-generation GIS platform developed to address the unique challenges of Bale Robe town, Ethiopia. By combining spatial analysis with AI, we empower local decision-makers to build a more resilient future.
          </p>
        </motion.div>

        {/* ... Rest of the component content omitted for brevity but keeping structure ... */}
      </div>
    </div>
  );
};

export default About;