import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { PRIMARY_NAV } from './nav';
import { useAuth } from '@/lib/auth';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-sm px-2 py-1 text-sm transition-colors transition-base',
    isActive ? 'text-ink font-medium' : 'text-ink-muted hover:text-ink',
  ].join(' ');

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const secondary = [
    { to: '/contribute', label: 'Contribute' },
    ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: 'Admin' }] : []),
  ];
  const account = user
    ? { to: '/account', label: user.displayName }
    : { to: '/login', label: 'Sign in' };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center gap-6 px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink"
        >
          <Logo />
          BioMed Zones
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <nav aria-label="Account" className="hidden items-center gap-1 md:flex">
            {secondary.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <ThemeToggle />
          <Link
            to={account.to}
            className="ml-1 hidden h-8 max-w-[12rem] items-center truncate rounded-md border border-border-strong px-3 text-sm text-ink transition-colors transition-base hover:bg-surface-hover md:inline-flex"
          >
            {account.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-hover md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col px-2 py-2">
              {[...PRIMARY_NAV, ...secondary, account].map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                    <span className="block px-2 py-2">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
