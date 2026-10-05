import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { routes } from '@/routes';
import { renderRoutes } from '@/test/render';
import { ADMIN, mockApi } from '@/test/fixtures';

afterEach(() => vi.unstubAllGlobals());

/** mockApi plus scripted answers for POST /api/auth/{login,register}. */
function authApi(answer: (path: string, body: Record<string, string>) => Response) {
  const base = mockApi();
  return vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const path = String(input).split('?')[0] ?? '';
    if (init?.method === 'POST' && path.startsWith('/api/auth/'))
      return answer(path, JSON.parse(String(init.body)) as Record<string, string>);
    return base(input);
  });
}
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

describe('Login page', () => {
  it('shows the API error for wrong credentials and stays on the page', async () => {
    const fetch = authApi(() =>
      json(401, { error: 'invalid_credentials', message: 'Email or password is incorrect.' }),
    );
    vi.stubGlobal('fetch', fetch);
    renderRoutes(routes, '/login');
    await userEvent.type(await screen.findByLabelText('Email'), 'someone@example.org');
    await userEvent.type(screen.getByLabelText('Password'), 'wrong-password');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByText('Email or password is incorrect.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign in');
    expect(fetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('maps server validation details onto the register form fields', async () => {
    vi.stubGlobal(
      'fetch',
      authApi(() =>
        json(400, {
          error: 'validation_error',
          message: 'Invalid request',
          details: [{ path: 'body.password', message: 'Password must be at least 12 characters' }],
        }),
      ),
    );
    renderRoutes(routes, '/login');
    await userEvent.click(await screen.findByRole('radio', { name: 'Register' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/contributor account/i);
    await userEvent.type(screen.getByLabelText('Display name'), 'New Person');
    await userEvent.type(screen.getByLabelText('Email'), 'new@example.org');
    await userEvent.type(screen.getByLabelText(/^Password/), 'short');
    await userEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(await screen.findByText('Password must be at least 12 characters')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/)).toHaveAttribute('aria-invalid', 'true');
  });

  it('signs in and redirects to the requested page', async () => {
    let signedIn = false;
    const base = mockApi();
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        const path = String(input).split('?')[0] ?? '';
        if (path === '/api/auth/login') {
          signedIn = true;
          return json(200, ADMIN);
        }
        if (path === '/api/auth/session')
          return json(200, { user: signedIn ? ADMIN : null, refreshable: signedIn });
        return base(input);
      }),
    );
    renderRoutes(routes, '/login?next=/species');
    await userEvent.type(await screen.findByLabelText('Email'), 'admin@test');
    await userEvent.type(screen.getByLabelText('Password'), 'correct horse battery');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByRole('heading', { level: 1, name: /species/i })).toBeInTheDocument();
  });
});
