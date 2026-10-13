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

  // Responsive preservation: If the canvas is intended to stretch with w-full / h-full,
  // do not lock it into a fixed pixel width that prevents it from responding to container growth.
  const isWidthFull = canvas.classList.contains("w-full") || canvas.style.width === "100%";
  const isHeightFull = canvas.classList.contains("h-full") || canvas.style.height === "100%";

  canvas.style.width = isWidthFull ? "100%" : `${w}px`;
  canvas.style.height = isHeightFull ? "100%" : `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return dpr;
}

/** Align circle centers to the device pixel grid (logical coords). */
export function snapCanvasCoord(value: number): number {
  return Math.round(value * 2) / 2;
}
