import sys, glob, os
from PIL import Image, ImageDraw
files = sorted(glob.glob(sys.argv[1] + '/*.png'))
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 4
w, h = 360, 640
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), 'white')
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((w, h))
    x, y = (i % cols) * w, (i // cols) * h
    sheet.paste(im, (x, y))
    fr = int(os.path.basename(f)[1:5])
    d.rectangle([x, y, x + 70, y + 22], fill='black')
    d.text((x + 4, y + 4), f'{fr/30:.2f}s', fill='white')
sheet.save(sys.argv[2])
