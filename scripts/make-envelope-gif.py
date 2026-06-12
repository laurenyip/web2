"""Align envelope stop-motion: rotate 90° CW, key bottom + side margins, export GIF."""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ASSETS = Path(
    r"C:\Users\Lauren Yip\.cursor\projects\c-Users-Lauren-Yip-Downloads-web2\assets"
)
OUT = Path(r"c:\Users\Lauren Yip\Downloads\web2\public\images\envelope.gif")

SOURCE_FRAMES = [
    "WhatsApp_Image_2026-06-10_at_11.56.40-c0ae4c8f-0a00-4a89-b08d-2076807ac50f.png",
    "WhatsApp_Image_2026-06-10_at_11.56.40__1_-167401e6-3652-4122-a10a-b13942b99c41.png",
    "WhatsApp_Image_2026-06-10_at_11.56.40__2_-111be9b4-c633-4f44-a966-3c0d2354e600.png",
    "WhatsApp_Image_2026-06-10_at_11.56.40__3_-336850c8-d56d-4a8b-a078-b3c1b93982e6.png",
    "WhatsApp_Image_2026-06-10_at_11.56.41__1_-e58aed91-c23e-4a22-a139-ed75f0c521f7.png",
    "WhatsApp_Image_2026-06-10_at_11.56.41-99417b21-1096-41b1-aac6-bb0e1deb97b1.png",
    "WhatsApp_Image_2026-06-10_at_11.56.41__2_-8277f140-64f5-48bd-9077-213270df1cc6.png",
]

PLAYBACK_ORDER = [5, 6, 1, 4, 2, 7]

TARGET_W = 540
TARGET_H = 960
MARGIN_X = 0.10
BOTTOM_Y = 0.70
FRAME_MS = 300
PAD = 240


def resolve_source_paths() -> list[Path]:
    paths: list[Path] = []
    for name in SOURCE_FRAMES:
        suffix = name.split("WhatsApp")[1]
        paths.append(next(iter(ASSETS.glob(f"*{suffix}"))))
    return paths


def rotate_cw(bgr: np.ndarray) -> np.ndarray:
    return cv2.rotate(bgr, cv2.ROTATE_90_CLOCKWISE)


def kraft_mask(bgr: np.ndarray) -> np.ndarray:
    h, _w = bgr.shape[:2]
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (12, 28, 70), (24, 145, 195))
    mask[int(h * 0.72) :, :] = 0
    return cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((13, 13), np.uint8))


def detect_envelope_bounds(bgr: np.ndarray) -> tuple[int, int, int]:
    """Return left, right, bottom of envelope body (kraft paper)."""
    mask = kraft_mask(bgr)
    h, w = bgr.shape[:2]

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = [c for c in contours if cv2.contourArea(c) > 3000]
    if not contours:
        return int(w * 0.15), int(w * 0.85), int(h * 0.55)

    contour = max(contours, key=cv2.contourArea)
    x, y, bw, bh = cv2.boundingRect(contour)
    roi = mask[y : y + bh, x : x + bw]

    row_counts = np.count_nonzero(roi, axis=1)
    peak = max(int(row_counts.max()), 1)

    # Bottom of body = lowest row in lower half with substantial width
    body_row = bh - 1
    for row in range(bh - 1, int(bh * 0.35), -1):
        if row_counts[row] >= peak * 0.5:
            body_row = row
            break

    bottom = y + body_row
    row_slice = roi[body_row]
    cols = np.where(row_slice > 0)[0]
    if cols.size:
        left = x + int(cols.min())
        right = x + int(cols.max())
    else:
        left, right = x, x + bw

    return left, right, bottom


def fit_frame(bgr: np.ndarray, left: int, right: int, bottom: int) -> np.ndarray:
    """Uniform scale + translate into output space."""
    padded = cv2.copyMakeBorder(bgr, PAD, PAD, PAD, PAD, cv2.BORDER_REPLICATE)
    left += PAD
    right += PAD
    bottom += PAD

    width = max(right - left, 1)
    scale = (TARGET_W * (1 - 2 * MARGIN_X)) / width

    tx = MARGIN_X * TARGET_W - left * scale
    ty = BOTTOM_Y * TARGET_H - bottom * scale

    matrix = np.float32([[scale, 0, tx], [0, scale, ty]])

    return cv2.warpAffine(
        padded,
        matrix,
        (TARGET_W, TARGET_H),
        flags=cv2.INTER_LANCZOS4,
        borderMode=cv2.BORDER_REPLICATE,
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
    sources = resolve_source_paths()
    rotated = [rotate_cw(cv2.imread(str(p))) for p in sources]
    ordered = [rotated[i - 1] for i in PLAYBACK_ORDER]

    bounds = [detect_envelope_bounds(frame) for frame in ordered]

    frames_pil: list[Image.Image] = []
    for bgr, (left, right, bottom) in zip(ordered, bounds):
        fitted = fit_frame(bgr, left, right, bottom)
        frames_pil.append(Image.fromarray(cv2.cvtColor(fitted, cv2.COLOR_BGR2RGB)))

    save_gif(frames_pil, OUT)
    print(f"Saved {len(frames_pil)} frames -> {OUT} ({TARGET_W}x{TARGET_H})")
    print(f"Layout: bottom @ {BOTTOM_Y:.0%} height, {MARGIN_X:.0%} side margins")
    for idx, (frame_no, box) in enumerate(zip(PLAYBACK_ORDER, bounds)):
        print(f"  frame {frame_no}: left={box[0]} right={box[1]} bottom={box[2]}")


if __name__ == "__main__":
    main()
