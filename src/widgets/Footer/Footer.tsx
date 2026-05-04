import OwnerLink from './OwnerLink';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className='flex'>
        © 2023 - {currentYear}.&nbsp;
        <OwnerLink />
      </p>
    </footer>
  );
};

export default Footer;
