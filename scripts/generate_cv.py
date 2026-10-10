"""Create public copies and browser previews from the two PDFs in cv/.
Requires pymupdf and pillow. Originals stay unchanged and are not deployed.
Generated files remain usable after source PDFs are removed.
"""
from pathlib import Path
import shutil
import pymupdf as fitz
from PIL import Image

root = Path(__file__).resolve().parents[1]
output = root / 'public/cv'
output.mkdir(parents=True, exist_ok=True)
for source, target, prefix in [
    ('CV-Shicheng Hu.pdf', 'CV-Shicheng-Hu.pdf', 'cv'),
    ('Resume-Shicheng Hu-Research.pdf', 'Resume-Shicheng-Hu-Research.pdf', 'research'),
]:
    doc = fitz.open(root / 'cv' / source)
    for page in doc:
        for rect in page.search_for('| Tel: (+1) 217-390-4862'):
            page.add_redact_annot(rect, fill=(1, 1, 1))
        excluded = page.search_for('81-Instruction Pipelined CPU & RTOS')
        following = page.search_for('Offline Ray-Traced Fluid Simulation')
        if excluded and following:
            page.add_redact_annot(fitz.Rect(0, excluded[0].y0 - 1, page.rect.width, following[0].y0 - 1), fill=(1, 1, 1))
        page.apply_redactions()
    doc.set_metadata({'title': 'Shicheng Hu - ' + ('CV' if prefix == 'cv' else 'Research Resume'), 'author': 'Shicheng Hu'})
    doc.save(output / target, garbage=4, deflate=True)
    doc.close()
    with fitz.open(output / target) as check:
        text = ''.join(page.get_text() for page in check)
        assert '217-390' not in text and 'Tel:' not in text and '81-Instruction' not in text and 'RTOS' not in text
        assert 'shu40@illinois.edu' in text
        for i, page in enumerate(check):
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            image = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
            image.save(output / f'{prefix}-{i+1}.webp', quality=90)
            print(target, 'page', i+1, image.size)
    print('Verified:', target)
# Preserve the original download URL for visitors who bookmarked it.
shutil.copyfile(output / 'CV-Shicheng-Hu.pdf', root / 'public/shicheng-hu-cv.pdf')
