import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <motion.section>
      <h1> Ini Hero Section </h1>
      <Button> Hello World! </Button>
    </motion.section>
  );
};

export default HeroSection;
