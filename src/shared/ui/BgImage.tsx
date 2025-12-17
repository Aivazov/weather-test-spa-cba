import Image from 'next/image';

type Props = {
  imgSrc: string;
  imgAlt: string;
};

const BgImage = ({ imgSrc, imgAlt }: Props) => {
  return (
    <Image
      src={imgSrc}
      alt={imgAlt}
      layout='fill'
      // layout='raw'
      // width={920}
      // height={614}
      className='object-cover absolute'
    />
  );
};

export default BgImage;
