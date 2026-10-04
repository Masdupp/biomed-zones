/** Reference validation for contributions: DOI via Crossref, URL via HTTP. */
export interface CheckedReference {
  doi?: string;
  url?: string;
  citation: string;
  status: 'verified' | 'unverified';
  title?: string;
  year?: number;
  checkedWith?: string;
}

const DOI_RE = /^10\.\d{4,9}\/\S+$/i;

export function normaliseDoi(input: string): string | null {
  const v = input
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '');
  return DOI_RE.test(v) ? v : null;
}

export async function checkReference(ref: {
  doi?: string;
  url?: string;
  citation?: string;
}): Promise<CheckedReference> {
  const doi = ref.doi ? normaliseDoi(ref.doi) : null;
  const base = {
    citation: ref.citation ?? '',
    ...(doi ? { doi } : {}),
    ...(ref.url ? { url: ref.url } : {}),
  };
  try {
    if (doi) {
      const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
        headers: { 'user-agent': 'BioMedZones/2.0 (reference check)' },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const m = (
          (await res.json()) as {
            message: { title?: string[]; issued?: { 'date-parts'?: number[][] } };
          }
        ).message;
        return {
          ...base,
          status: 'verified',
          title: m.title?.[0],
          year: m.issued?.['date-parts']?.[0]?.[0],
          checkedWith: 'Crossref',
          citation: base.citation || m.title?.[0] || doi,
        };
      }
    } else if (ref.url) {
      const res = await fetch(ref.url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return { ...base, status: 'verified', checkedWith: 'HTTP GET' };
    }
  } catch {
    // Network failure (offline demo): keep the reference, flagged unverified.
  }
  return { ...base, status: 'unverified' };
}
