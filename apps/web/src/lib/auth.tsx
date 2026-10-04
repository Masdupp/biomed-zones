import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';
import { request } from './api';
import type { Role, User } from './types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, displayName: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

async function fetchMe(): Promise<User | null> {
  // /auth/session always answers 200, so anonymous visits log no errors and never hit the
  // refresh endpoint; a refresh is attempted only when a refresh cookie exists.
  const session = await request<{ user: User | null; refreshable: boolean }>('/api/auth/session');
  if (session.user) return session.user;
  if (!session.refreshable) return null;
  try {
    return await request<User>('/api/auth/refresh', { method: 'POST' });
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ['me'], queryFn: fetchMe, staleTime: 5 * 60_000, retry: false });

  const login = useCallback(
    async (email: string, password: string) => {
      const user = await request<User>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      qc.setQueryData(['me'], user);
      return user;
    },
    [qc],
  );
  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      const user = await request<User>('/api/auth/register', {
        method: 'POST',
        body: { email, password, displayName },
      });
      qc.setQueryData(['me'], user);
      return user;
    },
    [qc],
  );
  const logout = useCallback(async () => {
    await request('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    qc.setQueryData(['me'], null);
    qc.removeQueries({ queryKey: ['contributions'] });
    qc.removeQueries({ queryKey: ['admin'] });
  }, [qc]);

  const value = useMemo<AuthState>(
    () => ({ user: me.data ?? null, loading: me.isPending, login, register, logout }),
    [me.data, me.isPending, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside AuthProvider');
  return ctx;
}

/** Route guard: sends anonymous users to /login (and back afterwards). */
export function RequireAuth({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: Role;
}) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8 text-sm text-ink-muted">
        Checking session…
      </div>
    );
  if (!user)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <h1 className="text-xl text-ink">Access restricted</h1>
        <p className="mt-2 text-sm text-ink-muted">
          This page requires the {requiredRole.toLowerCase()} role.
        </p>
      </div>
    );
  }
  return <>{children}</>;
}
