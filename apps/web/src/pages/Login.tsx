import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, ErrorNote, Field, Input, Segmented } from '@/components/ui';
import { ApiError } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export function Login() {
  const { user, login, register } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = params.get('next') ?? '/contribute';
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  if (user) return <Navigate to={next.startsWith('/') ? next : '/'} replace />;
  const fieldError = (f: string) => error?.details?.find((d) => d.path === `body.${f}`)?.message;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === 'login') await login(email, password);
      else await register(email, password, displayName);
      navigate(next.startsWith('/') ? next : '/', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError(0, 'error', 'Unexpected error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-[1440px] justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-xl text-ink">
          {mode === 'login' ? 'Sign in' : 'Create a contributor account'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Contributors submit observations; administrators validate them. Browsing needs no account.
        </p>
        <div className="mt-4">
          <Segmented
            label="Mode"
            value={mode}
            onChange={(m) => {
              setMode(m);
              setError(null);
            }}
            options={[
              { value: 'login', label: 'Sign in' },
              { value: 'register', label: 'Register' },
            ]}
          />
        </div>
        <form onSubmit={submit} className="mt-4 grid gap-3" noValidate>
          {mode === 'register' && (
            <Field label="Display name" id="name" error={fieldError('displayName')}>
              <Input
                id="name"
                autoComplete="nickname"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Field>
          )}
          <Field label="Email" id="email" error={fieldError('email')}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field
            label="Password"
            id="password"
            hint={
              mode === 'register' ? 'At least 12 characters. A passphrase works well.' : undefined
            }
            error={fieldError('password')}
          >
            <Input
              id="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {error && !error.details && <ErrorNote error={error} />}
          <Button type="submit" variant="primary" loading={busy}>
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </Button>
        </form>
        <details className="mt-6 rounded-md border border-border p-3 text-xs text-ink-muted">
          <summary className="cursor-pointer text-ink">Demo accounts</summary>
          <p className="mt-2 num">admin@biomed-zones.local · BioMedAdmin!2026</p>
          <p className="num">contributor@biomed-zones.local · BioMedContrib!2026</p>
        </details>
        <p className="mt-4 text-xs text-ink-subtle">
          Session cookies are httpOnly and SameSite=Strict. We store your email, display name and a
          password hash only.
        </p>
      </div>
    </div>
  );
}

export default Login;
