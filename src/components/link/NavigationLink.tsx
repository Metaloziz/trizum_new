import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
interface Props {
  onClick?: () => void;
  link: { label: string; href: string };
  className?: string;
  activeClassName?: string;
}

const Navigation: FunctionComponent<Props> = ({ link, onClick, className, activeClassName }) => {
  const router = useRouter();
  const { label, href } = link;
  const isActive = router.asPath === href;

  const linkClassNames = classNames(className, isActive && activeClassName);
  return (
    <button className={linkClassNames} onClick={onClick}>
      <Link href={href}>{label}</Link>
    </button>
  );
};

export default Navigation;
