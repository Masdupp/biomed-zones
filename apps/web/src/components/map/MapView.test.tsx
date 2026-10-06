import { render, screen } from '@testing-library/react';
import { MapView } from './MapView';

// The map libraries need browser APIs that jsdom lacks; the fallback path never uses them.
vi.mock('maplibre-gl', () => ({ default: {} }));
vi.mock('@deck.gl/mapbox', () => ({ MapboxOverlay: vi.fn() }));
vi.mock('@deck.gl/geo-layers', () => ({ H3HexagonLayer: vi.fn() }));

describe('MapView without WebGL', () => {
  it('explains how to enable WebGL instead of crashing', () => {
    // jsdom has no WebGL, like a browser with hardware acceleration turned off.
    render(<MapView cells={[]} ariaLabel="Suitability map" className="h-64" />);
    expect(screen.getByRole('note')).toHaveTextContent(/needs WebGL/);
    expect(screen.getByRole('note')).toHaveTextContent(/hardware acceleration/);
  });
});
