import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routes } from '@/routes';
import { renderRoutes } from '@/test/render';
import { ADMIN, mockApi } from '@/test/fixtures';

vi.mock('@/components/map/MiniMap', () => ({ default: () => <div data-testid="minimap" /> }));

afterEach(() => vi.unstubAllGlobals());

describe('AppShell and Home', () => {
  it('renders the value proposition, live numbers with sources, and the nine species', async () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cultivated sustainably/i);
    expect(await screen.findByText('150,146')).toBeInTheDocument();
    expect(screen.getByText('278,852')).toBeInTheDocument();
    expect(screen.getByText('GBIF + OBIS')).toBeInTheDocument();
    const list = screen.getByRole('heading', { name: /species in scope/i }).parentElement
      ?.nextElementSibling as HTMLElement;
    expect(await within(list).findAllByRole('link')).toHaveLength(9);
  });

  it('shows live service status from the health endpoints', async () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/');
    const status = screen.getByRole('contentinfo', { name: /service status/i });
    expect(await within(status).findByText(/postgis 3\.6\.4/)).toBeInTheDocument();
    expect(await within(status).findByText(/ml ok/)).toBeInTheDocument();
  });

  it('shows Sign in for visitors and hides the Admin link', async () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/');
    expect(await screen.findByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
  });

  it('shows the Admin link and the user name for administrators', async () => {
    vi.stubGlobal('fetch', mockApi(ADMIN));
    renderRoutes(routes, '/');
    expect(await screen.findByRole('link', { name: 'Admin' })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: 'Ada Lovelace' })).toHaveAttribute('href', '/account');
    expect(screen.queryByRole('link', { name: 'Sign in' })).not.toBeInTheDocument();
  });

  it('redirects anonymous visitors from protected pages to login', async () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/contribute');
    expect(await screen.findByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('cycles the theme and stores the preference', async () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/');
    await userEvent.click(screen.getByRole('button', { name: /system theme/i }));
    expect(document.documentElement.dataset.theme).toBe('light');
    await userEvent.click(screen.getByRole('button', { name: /light theme/i }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('bz-theme')).toBe('dark');
  });

  it('provides a skip link to the main content', () => {
    vi.stubGlobal('fetch', mockApi());
    renderRoutes(routes, '/');
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  });
});
