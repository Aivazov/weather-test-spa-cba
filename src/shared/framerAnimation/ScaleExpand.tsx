import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.JSX.Element;
  idx: number;
};

const ScaleExpand = ({ children, idx }: Props) => {
  return (
    <motion.div
      // key={idx}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.1 * idx,
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleExpand;
