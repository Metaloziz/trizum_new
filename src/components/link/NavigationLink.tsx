import { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './NavigationLink.module.scss';

import Image from 'components/image/Image';

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
  const { label, href, imageSrc } = link;
  // const isActive = router.asPath === href;
  return (
    <div className={wrapperClassName}>
      <NavLink
        to={href}
        className={({ isActive }) => `${className} ${isActive && activeClassName}`}
        onClick={onClick}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        {/* <a className={cn(className)} onClick={onClick}> */}
        <div className={cn(styles.imageBlock, imageClassName)}>
          <Image src={imageSrc} width={40} height={40} alt={label} />
        </div>
        <span>{label}</span>
        {/* </a> */}
      </NavLink>
    </div>
  );
};

export default Navigation;
