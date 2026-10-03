import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;
const LABELS = { system: 'System theme', light: 'Light theme', dark: 'Dark theme' } as const;

export function ThemeToggle() {
  const { preference, cycle } = useTheme();
  const Icon = ICONS[preference];
  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors transition-base hover:bg-surface-hover hover:text-ink"
      aria-label={`${LABELS[preference]}. Activate to change.`}
      title={LABELS[preference]}
    >
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
