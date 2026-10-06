let supported: boolean | undefined;

/**
 * Whether this browser can create a WebGL context. It cannot when hardware acceleration is
 * turned off, the GPU is blocklisted, or a privacy setting blocks WebGL; the maps then show a
 * fallback instead of failing (MapLibre throws "Failed to initialize WebGL").
 */
export function hasWebGL(): boolean {
  if (supported === undefined) {
    try {
      const canvas = document.createElement('canvas');
      supported = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      supported = false;
    }
  }
  return supported;
}
