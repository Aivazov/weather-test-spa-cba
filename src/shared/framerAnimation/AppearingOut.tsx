import { motion } from 'framer-motion';

type Props = {
  children: React.JSX.Element;
  retention: number;
};

const AppearingOut = ({ children, retention }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay: retention,
        // delay: 0.1 * idx
      }}
    >
      {children}
    </motion.div>
  );
};

export default AppearingOut;
