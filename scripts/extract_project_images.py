"""One-time extraction of selected report figures; never needed by the site."""
from pathlib import Path
from PIL import Image
import re
root = Path(__file__).resolve().parents[1]
out = root / 'public/images/projects'
out.mkdir(parents=True, exist_ok=True)
content = (root / 'src/content/site.ts').read_text(encoding='utf-8')
for source, name in [('innbook-24-0.png','innbook-editor'), ('innbook-24-1.png','innbook-story-tree'), ('fluid-54-3.png','fluid-scene'), ('fluid-54-4.png','fluid-render')]:
    image = Image.open(root / 'qa' / source).convert('RGB')
    image.save(out / f'{name}.webp', quality=90)
    pattern = r'(src: "/images/projects/'+name+r'\.webp".*?width: )\d+(, height: )\d+'
    content, count = re.subn(pattern, lambda m: m[1]+str(image.width)+m[2]+str(image.height), content, flags=re.S)
    assert count == 1, name
    print(name, image.size)
(root / 'src/content/site.ts').write_text(content, encoding='utf-8')
