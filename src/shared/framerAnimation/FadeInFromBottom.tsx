import { motion } from 'framer-motion';

type Props = {
  children: React.JSX.Element;
  idx?: number;
};

const FadeInFromBottom = ({ children, idx = 1 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * idx }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInFromBottom;
