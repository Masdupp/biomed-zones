import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routes } from '@/routes';
import { renderRoutes } from '@/test/render';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const body = url.startsWith('/api')
        ? {
            status: 'ok',
            version: '2.0.0',
            checks: {
              database: { status: 'ok', postgis: '3.6.4', h3: '4.2.3' },
              ml: { status: 'ok' },
            },
          }
        : { status: 'ok', service: 'ml', version: '2.0.0', database: 'ok' };
      return new Response(JSON.stringify(body), { status: 200 });
    }),
  );
});

afterEach(() => vi.unstubAllGlobals());

describe('AppShell', () => {
  it('renders the value proposition and all nine species', () => {
    renderRoutes(routes, '/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cultivated sustainably/i);
    const list = screen.getByRole('heading', { name: /species in scope/i })
      .nextElementSibling as HTMLElement;
    expect(within(list).getAllByRole('link')).toHaveLength(9);
  });

  it('shows live service status from the health endpoints', async () => {
    renderRoutes(routes, '/');
    const status = screen.getByRole('contentinfo', { name: /service status/i });
    expect(await within(status).findByText(/postgis 3\.6\.4/)).toBeInTheDocument();
    expect(within(status).getByText(/api ok/)).toBeInTheDocument();
    expect(await within(status).findByText(/ml ok/)).toBeInTheDocument();
  });

  it('marks unfinished pages with their delivery phase', async () => {
    renderRoutes(routes, '/');
    await userEvent.click(
      within(screen.getByRole('navigation', { name: 'Primary' })).getByRole('link', {
        name: 'Map',
      }),
    );
    expect(screen.getByRole('heading', { level: 1, name: /suitability map/i })).toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent('P5');
  });

  it('cycles the theme and stores the preference', async () => {
    renderRoutes(routes, '/');
    const toggle = screen.getByRole('button', { name: /system theme/i });
    await userEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe('light');
    await userEvent.click(screen.getByRole('button', { name: /light theme/i }));
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('bz-theme')).toBe('dark');
  });

  it('provides a skip link to the main content', () => {
    renderRoutes(routes, '/');
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
  });
});
