import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.JSX.Element;
  retention: number;
};

const ScaleExpand = ({ children, retention }: Props) => {
  return (
    <motion.div
      // key={retention}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.1 * retention,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleExpand;
