import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { Skeleton } from './ui';

/**
 * Renders one of the project's own generated documents (public/docs). The content is produced
 * by our build from repository files, never from user input.
 */
export function Markdown({ src }: { src: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        const base = src.slice(0, src.lastIndexOf('/') + 1);
        const out = marked.parse(text.replace(/\]\((?!https?:|#|\/)([^)]+)\)/g, `](${base}$1)`), {
          async: false,
        }) as string;
        // Wide tables scroll horizontally: wrap them in focusable, labelled regions (WCAG 2.1.1).
        const accessible = out
          .replace(
            /<table>/g,
            '<div class="table-scroll" role="region" aria-label="Table" tabindex="0"><table>',
          )
          .replace(/<\/table>/g, '</table></div>');
        if (alive) setHtml(accessible);
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [src]);
  if (error) return <p className="text-sm text-ink-muted">Document unavailable.</p>;
  if (html === null) return <Skeleton className="h-64 w-full" />;
  return <div className="prose-bz" dangerouslySetInnerHTML={{ __html: html }} />;
}
