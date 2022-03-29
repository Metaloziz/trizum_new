import Image from 'next/image';
import logoImage from '@public/assets/images/logo.png';

export const Logo = () => <Image src={logoImage} alt="Тризум" />;

export default Logo;
