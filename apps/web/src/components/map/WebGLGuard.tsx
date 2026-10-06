import { Component, type ReactNode } from 'react';
import { hasWebGL } from '@/lib/webgl';
import { NoWebGL } from './NoWebGL';

/** Catches a map that still fails to start (e.g. WebGL context creation refused at runtime). */
class MapBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Renders a map only when WebGL is available; otherwise (or if it fails) an explanation. */
export function WebGLGuard({
  className,
  compact,
  children,
}: {
  className?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  const fallback = <NoWebGL className={className} compact={compact} />;
  if (!hasWebGL()) return fallback;
  return <MapBoundary fallback={fallback}>{children}</MapBoundary>;
}
