import { motion } from 'framer-motion';

type Props = {
  children: React.JSX.Element;
};

const FadeInFromBottom = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInFromBottom;
