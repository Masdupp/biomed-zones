export interface NavItem {
  to: string;
  label: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { to: '/map', label: 'Map' },
  { to: '/species', label: 'Species' },
  { to: '/compare', label: 'Compare' },
  { to: '/model', label: 'Model' },
  { to: '/sources', label: 'Data sources' },
];

export const SECONDARY_NAV: NavItem[] = [
  { to: '/contribute', label: 'Contribute' },
  { to: '/admin', label: 'Admin' },
];
