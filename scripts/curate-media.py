"""Generate web-sized copies and a complete, visually reviewed asset inventory.
Original files are preserved. Runtime pages only use generated media metadata.
Run with Pillow and PyMuPDF available (PYTHONPATH=.tools/python in the local workspace).
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

root=Path(__file__).resolve().parents[1]
rows=[]
for path in sorted((root/'public/images').rglob('*'), key=lambda p:p.as_posix().lower()):
 if path.suffix.lower() not in ['.png','.jpg','.jpeg','.webp']: continue
 if path.name == 'tricolor_exp.png': continue # Maintained in supplemental-media.json.
 with Image.open(path) as source:
  im=ImageOps.exif_transpose(source)
  rows.append({'path':path.relative_to(root).as_posix(),'width':im.width,'height':im.height})
if len(rows)!=30:
 raise ValueError('The curated source set has changed; update subjects and uses before generating media.')
subjects=[
'Dragon boat team outdoors with university flag', 'Indoor dragon boat team group photograph', 'Dragon boat crew racing on a city waterway', 'Dragon boat team in front of an event backdrop', 'Vertical photograph of crew boarding beside the dock', 'Dragon boat crew lined up along the dock', 'Front view along a dragon boat on open water', 'Team with university flag in front of an event backdrop', 'Team group indoors with university flag',
'Square formal portrait without glasses', 'Square formal portrait with glasses', 'Square formal portrait with glasses, alternate expression', 'Three-quarter formal portrait, arms folded', 'Formal portrait adjusting a tie', 'Standing formal portrait with glasses',
'Photograph of a printed hanging copy of 同舟行', 'Fluid mesh / particle visualization', 'Dark render of sailboats and a water lily', 'Noisy underwater path-traced pool frame', 'Pool scene with sailboats and water lily', 'InnBook player dialogue interface', 'InnBook character and map interface', 'InnBook narrative editor', 'InnBook branching story canvas',
'Diagram of four scientific paradigms and behavioral simulation', 'Aerospace perspective figure with six illustrated panels', 'Comparison of Turing computation, simulation machine, and behavioral model', 'Wide multipanel unlearning evaluation bar chart', 'Vertical sunset rowing photograph', 'Rowing crew on calm open water beneath a broad sky',
]
uses={
 13:('portrait-large','Homepage biography, desktop','Portrait of Shicheng Hu adjusting his tie',''),
 11:('portrait','Homepage biography','Portrait of Shicheng Hu in a dark suit and glasses',''),
 15:('poetry-print','Tong Zhou Xing poem, right side','Printed hanging copy of the Chinese poem 同舟行','A printed copy of 同舟行.'),
 16:('fluid-mesh','Fluid detail, simulation section','Fluid surface mesh with visible grid and particle structure','Fluid mesh visualization from the project materials.'),
 17:('fluid-light','Fluid detail, expanded inline image','Sailboats and a water lily lit against a dark background','Lighting study from the team project.'),
 18:('fluid-render','Fluid detail, expanded inline image','Noisy path-traced view below the pool water surface','Path-traced frame, preserving the sampling noise of the original.'),
 19:('fluid-scene','Homepage project preview and fluid detail','Pool scene with sailboats, a water lily, and water reflections','Pool scene from the team project; scene assets and rendering were collaborative work.'),
 20:('innbook-play','Homepage thumbnail and principal InnBook detail image','InnBook prototype with dialogue, character portraits, and map','Player dialogue interface in the course prototype.'),
 21:('innbook-character','Unused alternate InnBook screenshot','InnBook prototype with character information and world map','Character and map view in the course prototype.'),
 22:('innbook-editor','Unused alternate InnBook editor screenshot','InnBook prototype with chapters and a narrative editor','Narrative editor from the team’s HCI course prototype.'),
 23:('innbook-tree','InnBook detail, author-control section','InnBook branching story canvas beside chapter navigation','Story-tree interface from the course prototype.'),
 24:('paradigms','Organized complexity detail, motivation','Diagram connecting empirical, theoretical, computational, and data-driven methods through behavioral simulation','Behavioral simulation as a synthesis of scientific paradigms.'),
 25:('aerospace','Homepage research preview','Six-panel figure accompanying the aerospace scientific-paradigms perspective','Figure supplied for the aerospace perspective.'),
 26:('simulation','Homepage research preview and organized complexity detail','Diagram comparing a Turing machine, a behavior simulation machine, and an agent-based behavioral model','From general computation to behavioral simulation: model, simulator, and observed state.'),
 28:('rowing-sunset','About rowing gallery, second image','Rowing on the water beneath an orange sunset','On the water at sunset.'),
 29:('rowing-crew','About rowing gallery, first image','Rowing crew in a long shell on calm water beneath a cloudy sky','A session on the water with Illini Rowing.'),
}
for i in range(9): uses[i]=(f'dragon-{i+1}','About chronological dragon boat gallery',subjects[i],f'Dragon boat · {i+1} / 9')
out=root/'public/media';out.mkdir(exist_ok=True)
media={}
inventory=['# Asset inventory and curation','', 'All 30 supplied image files were visually inspected, including portrait variants, technical figures, and the chronological dragon boat series. Originals are unchanged. Dimensions below are after EXIF orientation.','', '| Original file | Dimensions / ratio | Actual subject | Placement and decision | Homepage |','| --- | --- | --- | --- | --- |']
for i,row in enumerate(rows):
 path=root/row['path'];w,h=row['width'],row['height']
 use=uses.get(i)
 reason=use[1] if use else ('Unused: another portrait was selected to avoid repetition.' if 9<=i<=14 else 'Unused: the very wide evaluation chart loses readability at thumbnail scale; the FPI dataset figure communicates the topic more clearly.')
 inventory.append(f"| `{row['path']}` | {w} × {h} / {w/h:.2f}:1 | {subjects[i]} | {reason} | {'Yes, small preview' if i in [11,19,22,25,26] else 'No'} |")
 if not use: continue
 key,placement,alt,caption=use
 im=ImageOps.exif_transpose(Image.open(path)).convert('RGB')
 im.thumbnail((1680,1680) if i in [24,26] else (1200,1200))
 if key=='portrait': im.thumbnail((420,420))
 if key=='portrait-large': im.thumbnail((720,1080))
 im.save(out/f'{key}.webp',quality=88,lossless=i in [24,26])
 media[key]={'src':f'/media/{key}.webp','width':im.width,'height':im.height,'alt':alt,'caption':caption,'full': '/'+row['path'].removeprefix('public/')}
 if i in [19,20,22,25,26]:
  thumb=im.copy();thumb.thumbnail((420,280));thumb.save(out/f'{key}-thumb.webp',quality=88)
  media[key+'-thumb']={**media[key],'src':f'/media/{key}-thumb.webp','width':thumb.width,'height':thumb.height}
# FPI.pdf is a single raster figure, not a paper or a project report.
import pymupdf
with pymupdf.open(root/'public/images/research/FPI.pdf') as pdf:
 pix=pdf[0].get_pixmap(matrix=pymupdf.Matrix(2,2),alpha=False)
 im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
im.thumbnail((420,500));im.save(out/'fpi-thumb.webp',quality=90)
media['fpi-thumb']={'src':'/media/fpi-thumb.webp','width':im.width,'height':im.height,'alt':'Synthetic personal profiles converted into question–answer pairs for the FPI dataset','caption':'FPI: synthetic profiles and question–answer pairs.','full':'/images/research/FPI.pdf'}
inventory += ['', '## Additional files', '', '- `public/images/research/FPI.pdf`: inspected as a one-page figure of fake personal profiles and question–answer pairs; rendered as the homepage unlearning thumbnail. It is not a report or paper. The identity fields are explicitly synthetic.', '- Existing `public/cv/*` PDF pages and previews remain unchanged.', '- No dedicated Steins;Gate screenshot or browser source is present in the supplied public assets. The previous digital-logic report extraction in `qa/` documents an FPGA game; three real hardware demonstration photos are extracted from report pages 27, 28 and 30, with no standalone franchise assets or music distributed.', '', '## Curation rules', '', '- Dragon boat photographs keep numerical order 1–9. Captions do not infer event names, dates, or results.', '- Galleries are manual and mount only the current image. Research thumbnails preserve the entire figure; no chart axes or diagram labels are cropped.', '- The desktop portrait is IMG_9577; mobile uses IMG_9537. The four other portraits remain unused. The wide unlearning bar chart remains unused.', '- The printed poem is shown once on the right of Tong Zhou Xing. Rowing and dragon boat photos appear in distinct About sections.', '- WebP derivatives remove EXIF metadata. Full-resolution originals remain available for inspecting technical figures; no originals are deleted.']
extra=root/'src/content/supplemental-media.json'
if extra.exists(): media.update(json.loads(extra.read_text(encoding='utf-8')))
(root/'src/content/media.json').write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(root/'docs').mkdir(exist_ok=True)
(root/'docs/asset-inventory.md').write_text('\n'.join(inventory)+'\n',encoding='utf-8')
print('Inventoried',len(rows),'images; generated',len(media),'media records.')
