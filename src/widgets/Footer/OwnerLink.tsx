import Link from 'next/link';

const OwnerLink = () => {
  return (
    <Link
      href='https://welcome-to-tim.vercel.app/'
      target='_blank'
      rel='noopener noreferrer'
      className='cursor-pointer text-[#B8CFCE] hover:text-[#EAEFEF]'
    >
      Tim Aivazov
    </Link>
  );
};

export default OwnerLink;
