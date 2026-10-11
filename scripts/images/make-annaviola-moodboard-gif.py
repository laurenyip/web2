"""Render moodboard PDF pages and assemble a looping GIF."""
from pathlib import Path

import pymupdf
from PIL import Image

pdf = Path(r"c:\Users\Lauren Yip\Downloads\Silver Secrets AV Website MoodBoard (1).pdf")
out_dir = Path(r"c:\Users\Lauren Yip\Downloads\web2\public\images\projects\annaviola\moodboard")
out_dir.mkdir(parents=True, exist_ok=True)
banner_src = Path(
    r"C:\Users\Lauren Yip\.cursor\projects\c-Users-Lauren-Yip-Downloads-web2\assets"
    r"\c__Users_Lauren_Yip_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-9fdec33b-da00-468f-bcee-91d5bbfe09ae.png"
)
banner_dst = Path(r"c:\Users\Lauren Yip\Downloads\web2\public\images\projects\annaviola\banner-home.png")
banner_dst.write_bytes(banner_src.read_bytes())
print("banner", banner_dst, banner_dst.stat().st_size)

doc = pymupdf.open(pdf)
print("pages", doc.page_count)
frames = []
max_pages = min(doc.page_count, 8)
target_w = 900

for i in range(max_pages):
    page = doc[i]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.6, 1.6), alpha=False)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    if img.width != target_w:
        ratio = target_w / img.width
        img = img.resize((target_w, max(1, int(img.height * ratio))), Image.Resampling.LANCZOS)
    # letterbox to shared height so gif does not jump
    frames.append(img)
    slide = out_dir / f"slide-{i + 1:02d}.jpg"
    img.save(slide, "JPEG", quality=88, optimize=True)
    print("wrote", slide.name, img.size)

max_h = max(f.height for f in frames)
normalized = []
for img in frames:
    canvas = Image.new("RGB", (target_w, max_h), (10, 10, 10))
    y = (max_h - img.height) // 2
    canvas.paste(img, (0, y))
    normalized.append(canvas.convert("P", palette=Image.ADAPTIVE, colors=160))

gif_path = Path(r"c:\Users\Lauren Yip\Downloads\web2\public\images\projects\annaviola\moodboard.gif")
normalized[0].save(
    gif_path,
    save_all=True,
    append_images=normalized[1:],
    duration=1700,
    loop=0,
    optimize=False,
    disposal=2,
)
print("gif", gif_path, "MB", round(gif_path.stat().st_size / 1e6, 2))
