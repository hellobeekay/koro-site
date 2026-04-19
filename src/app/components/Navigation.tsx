import { Grid3x3 } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `tracking-wide transition-opacity ${
    isActive ? 'text-white opacity-100' : 'text-white opacity-90 hover:opacity-70'
  }`;

export function Navigation() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[900px]">
      <div className="bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-white tracking-wider hover:opacity-80 transition-opacity">
          KORO & CO.
        </Link>

        <div className="flex items-center gap-5 sm:gap-6 md:gap-8 flex-wrap justify-end">
          <NavLink to="/work" className={navLinkClass}>
            WORK
          </NavLink>
          <span
            className="text-white/50 tracking-wide cursor-not-allowed select-none"
            title="Coming soon"
            aria-disabled="true"
          >
            CULTURE
          </span>
          <NavLink to="/graveyard" className={navLinkClass}>
            GRAVEYARD
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
          <button type="button" className="text-white hover:opacity-70 transition-opacity" aria-label="Menu">
            <Grid3x3 size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

