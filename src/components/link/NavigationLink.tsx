import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

interface Props {
  onClick?: () => void;
  link: { label: string; href: string; imageSrc: string };
  className?: string;
  wrapperClassName?: string;
  activeClassName?: string;
  imageClassName?: string;
}

const Navigation: FunctionComponent<Props> = ({ link, onClick, className, wrapperClassName, imageClassName, activeClassName }) => {
  const router = useRouter();
  const { label, href, imageSrc } = link;
  const isActive = router.asPath === href;

  const linkClassNames = classNames(className, isActive && activeClassName);
  return (
    <div className={wrapperClassName}>
      <button className={linkClassNames} onClick={onClick}>
        <div className={imageClassName}>
          <Image src={imageSrc} width={40} height={40} alt={label} />
        </div>
        <Link href={href}>{label}</Link>
      </button>
    </div>
  );
};

export default Navigation;
