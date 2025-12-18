// import styles from './BgAnimation.module.scss';

// type Props = {};

// const BgAnimation = (props: Props) => {
//   return <div className={styles.rainbowBackground}></div>;
// };

// export default BgAnimation;

import styles from './BgAnimation.module.scss';

type Props = {
  colors: string[];
};

const BgAnimation = ({ colors }: Props) => {
  const [color1, color2, color3, color4, color5, color6, color7, color8] =
    colors;
  // const gradient = `linear-gradient(45deg, ${colors.join(', ')})`;

  return (
    <div
      className={styles.rainbowBackground}
      // style={{ background: gradient }}
      style={
        {
          '--color1': color1,
          '--color2': color2,
          '--color3': color3,
          '--color4': color4,
          '--color5': color5,
          '--color6': color6,
          '--color7': color7,
          '--color8': color8,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default BgAnimation;
