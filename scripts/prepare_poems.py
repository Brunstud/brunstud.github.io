"""One-time import helper; the website reads only src/content/poems.json."""
import json
import re
from pathlib import Path

source = json.loads(Path('qa/poem-source.json').read_text(encoding='utf-8'))
for title, paragraphs in source.items():
    result = []
    stanza = 0
    for paragraph in paragraphs[1:]:
        if paragraph.startswith('白话译文'):
            break
        if paragraph == '二〇二六届龙舟队队员':
            continue
        if not paragraph.strip():
            stanza += 1
            continue
        if paragraph == '补叙':
            stanza += 1
            continue
        paragraph = re.sub(r'\[[\d,\-]+\]', '', paragraph)
        sentences = re.findall(r'.+?[。？！][”」]?|.+$', paragraph)
        result.extend({'zh': s, 'stanza': stanza} for s in sentences)
    Path(f'qa/{title}.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(title, len(result))
    if title != '同舟行':
        for i, line in enumerate(result): print(i, line['zh'])
