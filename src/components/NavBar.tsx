import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import routes from '@/routes';

const NavBar = () => {
  const pathName = usePathname();

  return (
    <header>
      <nav className="nav">
        <Link className={cn('nav-link', { active: pathName === routes.homePage })} href={routes.homePage}>Все котики</Link>
        <Link className={cn('nav-link', { active: pathName === routes.myPage })} href={routes.myPage}>Любимые котики</Link>
      </nav>
    </header>
  );
};

export default NavBar;
