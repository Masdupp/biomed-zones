import { useEffect, useMemo, useRef } from 'react';
import maplibregl, { type LngLatBoundsLike } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import type { PickingInfo } from '@deck.gl/core';
import { basemapStyle } from '@/lib/basemap';
import { CATEGORY_LABEL, cellColor } from '@/lib/color';
import { useDark } from '@/lib/useDark';
import type { CellRow } from '@/lib/types';

export interface ViewState {
  zoom: number;
  bbox: [number, number, number, number];
}

interface Props {
  cells: CellRow[];
  selected?: string | null;
  onSelect?: (h3: string) => void;
  onView?: (v: ViewState) => void;
  /** Bounds to fit; change `focusKey` to re-trigger the same bounds. */
  focus?: { bounds: LngLatBoundsLike; key: string } | null;
  interactive?: boolean;
  initialBounds?: LngLatBoundsLike;
  ariaLabel: string;
  className?: string;
  /** Tooltip text for a hovered cell (defaults to category and score). */
  formatTooltip?: (row: CellRow) => string;
}

const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function MapView({
  cells,
  selected,
  onSelect,
  onView,
  focus,
  interactive = true,
  initialBounds = [
    [-5.6, 41.2],
    [9.8, 51.3],
  ],
  ariaLabel,
  className,
  formatTooltip,
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const overlay = useRef<MapboxOverlay | null>(null);
  const dark = useDark();
  const handlers = useRef({ onSelect, onView });
  handlers.current = { onSelect, onView };

  useEffect(() => {
    if (!container.current) return;
    const m = new maplibregl.Map({
      container: container.current,
      style: basemapStyle(dark),
      bounds: initialBounds,
      fitBoundsOptions: { padding: 16 },
      interactive,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
      maxZoom: 12,
      minZoom: 1.5,
    });
    m.touchZoomRotate.disableRotation();
    // Non-interactive previews credit the basemap in their caption instead.
    if (interactive) {
      m.addControl(
        new maplibregl.AttributionControl({
          compact: true,
          customAttribution: 'Basemap: Natural Earth, Marine Regions · Scores: BioMed Zones model',
        }),
      );
    }
    if (interactive)
      m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    const o = new MapboxOverlay({ interleaved: false, layers: [] });
    m.addControl(o);
    const emit = () => {
      const b = m.getBounds();
      handlers.current.onView?.({
        zoom: m.getZoom(),
        bbox: [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()],
      });
    };
    m.on('load', emit);
    m.on('moveend', emit);
    map.current = m;
    overlay.current = o;
    return () => {
      m.remove();
      map.current = null;
      overlay.current = null;
    };
    // Map is created once; later prop changes are applied by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    map.current?.setStyle(basemapStyle(dark));
  }, [dark]);

  useEffect(() => {
    if (!focus || !map.current) return;
    map.current.fitBounds(focus.bounds, {
      padding: 24,
      duration: reducedMotion() ? 0 : 700,
      essential: true,
    });
  }, [focus]);

  const layers = useMemo(() => {
    const base = new H3HexagonLayer<CellRow>({
      id: 'cells',
      data: cells,
      getHexagon: (d) => d[0],
      getFillColor: (d) => cellColor(d[1], d[2]),
      extruded: false,
      stroked: false,
      pickable: interactive,
      highPrecision: 'auto',
      autoHighlight: interactive,
      highlightColor: [255, 255, 255, 70],
      transitions: reducedMotion() ? undefined : { getFillColor: 200 },
    });
    const sel = selected
      ? new H3HexagonLayer<string>({
          id: 'selected',
          data: [selected],
          getHexagon: (d) => d,
          filled: false,
          stroked: true,
          getLineColor: dark ? [255, 255, 255, 255] : [12, 17, 22, 255],
          lineWidthUnits: 'pixels',
          getLineWidth: 2.5,
        })
      : null;
    return sel ? [base, sel] : [base];
  }, [cells, selected, interactive, dark]);

  useEffect(() => {
    overlay.current?.setProps({
      layers,
      onClick: (info: PickingInfo<CellRow>) => {
        if (info.object) handlers.current.onSelect?.(info.object[0]);
      },
      getTooltip: interactive
        ? (info: PickingInfo<CellRow>) =>
            info.object
              ? {
                  text: formatTooltip
                    ? formatTooltip(info.object)
                    : `${CATEGORY_LABEL[info.object[2]] ?? info.object[2]} · score ${info.object[1].toFixed(0)}\n${info.object[0]}`,
                  style: {
                    background: 'var(--surface)',
                    color: 'var(--ink)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '4px 6px',
                    whiteSpace: 'pre',
                  },
                }
              : null
        : undefined,
      getCursor: ({ isHovering }: { isHovering: boolean }) => (isHovering ? 'pointer' : 'grab'),
    });
  }, [layers, interactive, formatTooltip]);

  // MapLibre forces `position: relative` on its container, so positioning classes go on a wrapper.
  return (
    <div className={className}>
      <div
        ref={container}
        className="h-full w-full"
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="map"
      />
    </div>
  );
}
