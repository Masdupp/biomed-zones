import { MapPinOff } from 'lucide-react';
import { cx } from '@/lib/cx';

/** Shown in place of a map when the browser cannot create a WebGL context. */
export function NoWebGL({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      role="note"
      className={cx(
        'flex items-center justify-center bg-bg-subtle p-4 text-center text-sm text-ink-muted',
        className,
      )}
    >
      <div className="max-w-md">
        <MapPinOff className="mx-auto mb-2 text-ink-subtle" size={28} aria-hidden="true" />
        <p className="font-medium text-ink">
          The map needs WebGL, which is turned off in this browser.
        </p>
        {!compact && (
          <p className="mt-1">
            Turn on hardware acceleration (Chrome: Settings → System → “Use graphics acceleration
            when available”, then relaunch) or try another browser. Scores, explanations and the
            list of best cells still work without the map.
          </p>
        )}
      </div>
    </div>
  );
}
