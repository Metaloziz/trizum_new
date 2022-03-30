import { FC } from 'react';
import NavigationLink from '@components/link/NavigationLink';

interface Props {
  links: { label: string; href: string; imageSrc: string }[];
  onClick?: () => void;
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  linkWrapperClassName?: string;
  linkImageClassName?: string;
}

const Navigation: FC<Props> = ({ links, onClick, linkClassName, linkWrapperClassName, linkImageClassName, activeClassName }) => (
  <nav>
    {links.map((link, i: number) => (
      <NavigationLink
        key={i}
        link={link}
        wrapperClassName={linkWrapperClassName}
        imageClassName={linkImageClassName}
        className={linkClassName}
        onClick={onClick}
        activeClassName={activeClassName}
      />
    ))}
  </nav>
);

export default Navigation;
