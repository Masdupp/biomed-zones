import type { Photo } from '@/lib/types';
import { cx } from '@/lib/cx';
import { asset } from '@/lib/static';

/**
 * Wikimedia Commons photo with visible author / licence credit, or a neutral placeholder.
 * Uses the vendored local copy (works offline); falls back to the Commons URL.
 */
export function SpeciesPhoto({
  photo,
  name,
  className,
  credit = true,
  size = 'full',
}: {
  photo: Photo | null;
  name: string;
  className?: string;
  credit?: boolean;
  size?: 'thumb' | 'full';
}) {
  if (!photo) {
    return (
      <div
        className={cx(
          'flex items-center justify-center bg-bg-subtle text-xs text-ink-subtle',
          className,
        )}
        role="img"
        aria-label={`No photo available for ${name}`}
      >
        No photo
      </div>
    );
  }
  const src = photo.local_path
    ? asset(size === 'thumb' ? photo.local_path.replace(/\.jpg$/, '-thumb.jpg') : photo.local_path)
    : photo.url;
  return (
    <figure className={cx('relative overflow-hidden bg-bg-subtle', className)}>
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        width={size === 'thumb' ? 192 : 640}
        height={size === 'thumb' ? 144 : 480}
        className="h-full w-full object-cover"
      />
      {credit && (
        <figcaption className="absolute right-0 bottom-0 left-0 truncate bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
          <a
            href={photo.source_page}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline"
          >
            {photo.author}
          </a>{' '}
          · {photo.license}
        </figcaption>
      )}
    </figure>
  );
}
