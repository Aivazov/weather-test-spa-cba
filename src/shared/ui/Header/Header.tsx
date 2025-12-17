import SearchBar from '@/features/weather/components/SearchBar/SearchBar';
import styles from './Header.module.scss';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <SearchBar />
    </header>
  );
};

export default Header;
