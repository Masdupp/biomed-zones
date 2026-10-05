import { render, screen } from '@testing-library/react';
import { Markdown } from './Markdown';

afterEach(() => vi.unstubAllGlobals());

describe('Markdown', () => {
  it('rewrites relative links and wraps tables in focusable scroll regions', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            '# Report\n\nSee [card](MODEL_CARD.md).\n\n| a | b |\n|---|---|\n| 1 | 2 |\n',
          ),
      ),
    );
    render(<Markdown src="/docs/DATA_REPORT.md" />);
    expect(await screen.findByRole('heading', { name: 'Report' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'card' })).toHaveAttribute(
      'href',
      '/docs/MODEL_CARD.md',
    );
    const region = screen.getByRole('region', { name: 'Table' });
    expect(region).toHaveAttribute('tabindex', '0');
    expect(region.querySelector('table')).not.toBeNull();
  });

  it('says so when the document cannot be loaded', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 404 })),
    );
    render(<Markdown src="/docs/missing.md" />);
    expect(await screen.findByText('Document unavailable.')).toBeInTheDocument();
  });
});
