import { render, screen } from '@testing-library/react';
import { BarList, Meter, RadarChart, RangeChart, ShapBars } from './charts';

const band = { min: 5, opt_min: 10, opt_max: 18, max: 25, extreme_max: 28 };

describe('SVG charts', () => {
  it('RangeChart describes the band and the cell value in its accessible name', () => {
    render(<RangeChart band={band} unit="°C" marker={12.345} />);
    expect(
      screen.getByRole('img', {
        name: 'Tolerance 5 to 25 °C, optimum 10 to 18 °C, cell value 12.3 °C',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('10–18')).toBeInTheDocument();
  });

  it('RangeChart omits the marker when the cell has no value', () => {
    render(<RangeChart band={band} unit="PSU" marker={null} />);
    expect(screen.getByRole('img').getAttribute('aria-label')).not.toMatch(/cell value/);
  });

  it('RadarChart draws one polygon per series plus four grid rings', () => {
    const { container } = render(
      <RadarChart
        axes={['A', 'B', 'C', 'D', 'E']}
        series={[
          { name: 'cell 1', values: [100, 80, 60, 40, 20] },
          { name: 'cell 2', values: [50, null, 50, 50, 50] },
        ]}
      />,
    );
    expect(screen.getByRole('img', { name: /cell 1, cell 2/ })).toBeInTheDocument();
    expect(container.querySelectorAll('polygon').length).toBe(4 + 2);
  });

  it('ShapBars writes the sign so direction is not conveyed by colour alone', () => {
    render(
      <ShapBars
        items={[
          { label: 'SST', value: 14.2, shap: 0.42 },
          { label: 'Depth', value: -3, shap: -0.17 },
        ]}
      />,
    );
    expect(screen.getByText('+0.42')).toBeInTheDocument();
    expect(screen.getByText('−0.17')).toBeInTheDocument();
  });

  it('BarList scales bars to the largest value', () => {
    const { container } = render(
      <BarList
        items={[
          { label: 'a', value: 2 },
          { label: 'b', value: 1 },
        ]}
      />,
    );
    const bars = [...container.querySelectorAll<HTMLElement>('span.block')];
    expect(bars.map((b) => b.style.width)).toEqual(['100%', '50%']);
  });

  it('Meter exposes and clamps its value', () => {
    const { container } = render(<Meter value={130} label="Confidence" />);
    expect(screen.getByRole('meter', { name: 'Confidence' })).toHaveAttribute(
      'aria-valuenow',
      '130',
    );
    expect((container.querySelector('[role=meter] > div') as HTMLElement).style.width).toBe('100%');
  });
});
