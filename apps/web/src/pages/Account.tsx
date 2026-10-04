import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Badge, Button, ConfirmDialog, ErrorNote, Field, Input, Panel } from '@/components/ui';
import { ApiError, request } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { date } from '@/lib/format';

export function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  if (!user) return null;

  const exportData = async () => {
    const res = await fetch('/api/me/export', { credentials: 'include' });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biomed-zones-data-${user.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async () => {
    setBusy(true);
    setError(null);
    try {
      await request('/api/me', { method: 'DELETE', body: { password, confirm } });
      await logout();
      navigate('/', { replace: true });
    } catch (e) {
      setError(e instanceof ApiError ? e : null);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-[960px] px-4 py-8">
      <PageHeader
        title="Account"
        description="Your personal data and rights under the GDPR."
        actions={<Button onClick={() => logout().then(() => navigate('/'))}>Sign out</Button>}
      />
      <div className="mt-6 grid gap-4">
        <Panel title="Profile">
          <dl className="grid grid-cols-[8rem_1fr] gap-y-1.5 text-sm">
            <dt className="text-ink-subtle">Display name</dt>
            <dd>{user.displayName}</dd>
            <dt className="text-ink-subtle">Email</dt>
            <dd>{user.email}</dd>
            <dt className="text-ink-subtle">Role</dt>
            <dd>
              <Badge tone={user.role === 'ADMIN' ? 'brand' : 'neutral'}>
                {user.role.toLowerCase()}
              </Badge>
            </dd>
            <dt className="text-ink-subtle">Member since</dt>
            <dd className="num">{date(user.createdAt)}</dd>
          </dl>
        </Panel>
        <Panel title="Export my data">
          <p className="text-sm text-ink-muted">
            Download everything we hold about you (profile, contributions, sessions, your audit
            entries) as a JSON file. Password hashes are never included.
          </p>
          <Button className="mt-3" onClick={exportData}>
            Download my data
          </Button>
        </Panel>
        <Panel title="Delete my account">
          <p className="text-sm text-ink-muted">
            Your account, sessions, drafts and pending contributions are deleted. Contributions
            already reviewed are kept for scientific traceability but no longer linked to you (shown
            as “Deleted user”). This cannot be undone.
          </p>
          <div className="mt-3 grid max-w-sm gap-3">
            <Field label="Password" id="del-password">
              <Input
                id="del-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field label='Type "DELETE" to confirm' id="del-confirm">
              <Input
                id="del-confirm"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>
            {error && <ErrorNote error={error} />}
            <Button
              variant="danger"
              disabled={!password || confirm !== 'DELETE'}
              onClick={() => setOpen(true)}
            >
              Delete my account
            </Button>
          </div>
        </Panel>
      </div>
      <ConfirmDialog
        open={open}
        title="Delete your account?"
        confirmLabel="Delete permanently"
        danger
        busy={busy}
        onConfirm={remove}
        onCancel={() => setOpen(false)}
      >
        This removes {user.email} and its unreviewed contributions.
      </ConfirmDialog>
    </div>
  );
}

export default Account;
