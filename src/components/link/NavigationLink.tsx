import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  onClick?: () => void;
  link: { label: string; href: string; imageSrc: string };
  className?: string;
  wrapperClassName?: string;
  activeClassName?: string;
  imageClassName?: string;
}

const Navigation: FC<Props> = ({
  link,
  onClick,
  className,
  wrapperClassName,
  imageClassName,
  activeClassName,
}) => {
  const router = useRouter();
  const { label, href, imageSrc } = link;
  const isActive = router.asPath === href;

  return (
    <div className={wrapperClassName}>
      <Link passHref href={href || '/'}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          className={cn(className, isActive && activeClassName)}
          onClick={onClick}
        >
          <div className={imageClassName}>
            <Image src={imageSrc} width={40} height={40} alt={label} />
          </div>
          {label}
        </a>
      </Link>
    </div>
  );
};

export default Navigation;
