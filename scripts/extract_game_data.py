#!/usr/bin/env python3
"""Re-extract the embedded gameData JSON from the Claude Design HTML bundle.

The design export embeds game data as a gzip+base64 JSON resource inside a
<script type="__bundler/manifest"> tag. This dumps it to stdout as JSON.

Usage: python3 scripts/extract_game_data.py path/to/design_bundle.html
"""
import re, json, base64, gzip, sys

def main(path):
    data = open(path, encoding="utf-8", errors="replace").read()
    m = re.search(r'<script type="__bundler/manifest">\s*(\{.*?\})\s*</script>', data, re.S)
    manifest = json.loads(m.group(1))
    for v in manifest.values():
        if v.get("mime") == "application/json":
            raw = base64.b64decode(v["data"])
            if v.get("compressed"):
                raw = gzip.decompress(raw)
            gd = json.loads(raw.decode("utf-8"))
            print(json.dumps(gd, ensure_ascii=False, indent=2))
            return
    raise SystemExit("no application/json resource found")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "design_bundle.html")
