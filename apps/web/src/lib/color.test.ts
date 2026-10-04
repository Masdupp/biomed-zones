import { cellColor, viridis } from './color';

describe('viridis', () => {
  it('maps the ends of the scale to the viridis endpoints', () => {
    expect(viridis(0)).toEqual([68, 1, 84]);
    expect(viridis(1)).toEqual([253, 231, 37]);
  });
  it('clamps out-of-range input', () => {
    expect(viridis(-1)).toEqual(viridis(0));
    expect(viridis(2)).toEqual(viridis(1));
  });
  it('increases monotonically in lightness proxy (R+G+B)', () => {
    const sums = Array.from({ length: 11 }, (_, i) => viridis(i / 10).reduce((a, b) => a + b, 0));
    sums.slice(1).forEach((v, i) => expect(v).toBeGreaterThan((sums[i] ?? 0) - 1));
  });
  it('draws excluded cells in neutral grey', () => {
    expect(cellColor(80, 'excluded').slice(0, 3)).toEqual([148, 152, 158]);
  });
});
