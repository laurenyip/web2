"""Card stop-motion: rotate 90° CW, center full card on white, no zoom-in."""

from __future__ import annotations

import re
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ASSETS = Path(
    r"C:\Users\Lauren Yip\.cursor\projects\c-Users-Lauren-Yip-Downloads-web2\assets"
)
OUT = Path(r"c:\Users\Lauren Yip\Downloads\web2\public\images\card.gif")

TARGET_W = 540
TARGET_H = 960
MARGIN = 48
FRAME_MS = 250
WHITE = (255, 255, 255)


def resolve_card_paths() -> list[tuple[int, Path]]:
    numbered: list[tuple[int, Path]] = []
    for path in ASSETS.iterdir():
        match = re.search(r"_images_(\d+)-", path.name)
        if match:
            numbered.append((int(match.group(1)), path))
    numbered.sort(key=lambda item: item[0])
    return numbered


def rotate_cw(bgr: np.ndarray) -> np.ndarray:
    return cv2.rotate(bgr, cv2.ROTATE_90_CLOCKWISE)


def detect_card_bounds(bgr: np.ndarray) -> tuple[int, int, int, int]:
    """Return left, top, right, bottom of the full white card."""
    h, w = bgr.shape[:2]
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    _, mask = cv2.threshold(lab[:, :, 0], 192, 255, cv2.THRESH_BINARY)

    mask[: int(h * 0.02), :] = 0
    mask[int(h * 0.92) :, :] = 0
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((17, 17), np.uint8))

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = [c for c in contours if 8000 < cv2.contourArea(c) < w * h * 0.65]
    if not contours:
        return int(w * 0.10), int(h * 0.08), int(w * 0.90), int(h * 0.55)

    contour = max(contours, key=cv2.contourArea)
    x, y, bw, bh = cv2.boundingRect(contour)
    roi = mask[y : y + bh, x : x + bw]

    rows = np.any(roi, axis=1)
    cols = np.any(roi, axis=0)
    if not rows.any() or not cols.any():
        return x, y, x + bw, y + bh

    row_idx = np.where(rows)[0]
    col_idx = np.where(cols)[0]
    top = y + int(row_idx.min())
    bottom = y + int(row_idx.max())
    left = x + int(col_idx.min())
    right = x + int(col_idx.max())

    return left, top, right, bottom


def reference_card(
    bounds: list[tuple[int, int, int, int]],
) -> tuple[float, float, float, float]:
    """Median card center and size — shared anchor for every frame."""
    centers_x = [(l + r) / 2 for l, _t, r, _b in bounds]
    centers_y = [(t + b) / 2 for _l, t, _r, b in bounds]
    widths = [r - l for l, _t, r, _b in bounds]
    heights = [b - t for _l, t, _r, b in bounds]
    return (
        float(np.median(centers_x)),
        float(np.median(centers_y)),
        float(np.median(widths)),
        float(np.median(heights)),
    )


def compute_scale(ref_w: float, ref_h: float) -> float:
    """One scale for all frames — shrink only if needed, never zoom in."""
    fit_w = (TARGET_W - 2 * MARGIN) / max(ref_w, 1)
    fit_h = (TARGET_H - 2 * MARGIN) / max(ref_h, 1)
    return min(1.0, fit_w, fit_h)


def translate_to_reference(
    bgr: np.ndarray,
    left: int,
    top: int,
    right: int,
    bottom: int,
    ref_cx: float,
    ref_cy: float,
) -> np.ndarray:
    """Shift frame so this card center matches the shared reference center."""
    cx = (left + right) / 2.0
    cy = (top + bottom) / 2.0
    dx = ref_cx - cx
    dy = ref_cy - cy

    matrix = np.float32([[1, 0, dx], [0, 1, dy]])
    h, w = bgr.shape[:2]
    return cv2.warpAffine(
        bgr,
        matrix,
        (w, h),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=WHITE,
    )


def fit_fixed(bgr: np.ndarray, ref_cx: float, ref_cy: float, scale: float) -> np.ndarray:
    """Identical warp for every frame after pre-alignment."""
    tx = TARGET_W / 2 - ref_cx * scale
    ty = TARGET_H / 2 - ref_cy * scale

    matrix = np.float32([[scale, 0, tx], [0, scale, ty]])
    return cv2.warpAffine(
        bgr,
        matrix,
        (TARGET_W, TARGET_H),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=WHITE,
    )


def save_gif(frames: list[Image.Image], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_MS,
        loop=0,
        disposal=2,
    )


def main() -> None:
    sources = resolve_card_paths()
    if not sources:
        raise SystemExit("No numbered card images found in assets")

    rotated = [rotate_cw(cv2.imread(str(path))) for _num, path in sources]
    bounds = [detect_card_bounds(frame) for frame in rotated]

    ref_cx, ref_cy, ref_w, ref_h = reference_card(bounds)
    scale = compute_scale(ref_w, ref_h)

    frames_pil: list[Image.Image] = []
    for bgr, box in zip(rotated, bounds):
        aligned = translate_to_reference(bgr, *box, ref_cx, ref_cy)
        fitted = fit_fixed(aligned, ref_cx, ref_cy, scale)
        frames_pil.append(Image.fromarray(cv2.cvtColor(fitted, cv2.COLOR_BGR2RGB)))

    save_gif(frames_pil, OUT)
    order = [n for n, _ in sources]
    print(f"Saved {len(frames_pil)} frames -> {OUT} ({TARGET_W}x{TARGET_H})")
    print(f"Order (pic #): {order}")
    print(f"Fixed scale {scale:.4f}, ref card {ref_w:.0f}x{ref_h:.0f}px @ ({ref_cx:.0f}, {ref_cy:.0f})")


if __name__ == "__main__":
    main()
