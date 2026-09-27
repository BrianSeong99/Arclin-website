"""Regenerate public/fonts/ResourceHanRoundedSC-{Regular,Medium}.woff2 from the full Resource Han Rounded CN
TTFs, subset to every CJK character used in lib/i18n/messages/zh.ts and scripts/og.mjs plus basic Latin and CJK punctuation.
Run after changing Chinese copy:  python3 scripts/subset-zh-font.py path/to/ResourceHanRoundedCN-Regular.ttf path/to/ResourceHanRoundedCN-Medium.ttf
Needs `pip install fonttools brotli`. Source: https://github.com/CyanoHao/Resource-Han-Rounded (SIL Open Font License 1.1)."""
import os, sys
from fontTools import subset

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = "".join(open(os.path.join(ROOT, f), encoding="utf-8").read() for f in ("lib/i18n/messages/zh.ts", "scripts/og.mjs"))
chars = {c for c in src if ord(c) > 0x2E7F}
basic = {chr(c) for c in range(0x20, 0x7F)} | set("，。、；：？！“”‘’（）《》〈〉【】—…·・～％")
unicodes = ",".join(f"U+{ord(c):04X}" for c in sorted(chars | basic))
for path in sys.argv[1:]:
    weight = "Medium" if "Medium" in path else "Regular"
    out = os.path.join(ROOT, f"public/fonts/ResourceHanRoundedSC-{weight}.woff2")
    subset.main([path, f"--unicodes={unicodes}", "--flavor=woff2", f"--output-file={out}", "--layout-features=*", "--no-hinting", "--desubroutinize"])
    print(out, os.path.getsize(out), "bytes,", len(chars), "CJK characters")
