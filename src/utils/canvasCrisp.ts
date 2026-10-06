/** Logical-pixel canvas sizing for sharp dots on retina displays. */
export function setupCrispCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number,
  maxDpr = 3
): number {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = Math.max(1, Math.round(cssWidth));
  const h = Math.max(1, Math.round(cssHeight));

  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return dpr;
}

/** Align circle centers to the device pixel grid (logical coords). */
export function snapCanvasCoord(value: number): number {
  return Math.round(value * 2) / 2;
}
