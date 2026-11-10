#!/usr/bin/env python3
"""Copy the CD44 design system loaded by the site into static/.

Mirrors the layout of design.loire-atlantique.fr (css/, fonts/, assets/) so the
stylesheets' relative paths keep working unchanged.

- css/cd44.css, css/icons.css and every file they reference;
- except the commercial fonts HansomFYW05 and ModernMTStd, unused by the site;
- Poppins (OFL license), imported from Google Fonts by cd44.css: copied into
  fonts/poppins/ (latin and latin-ext subsets), import replaced by css/poppins.css.

Usage: python3 scripts/copie-charte-cd44.py
"""
import pathlib
import posixpath
import re
import urllib.error
import urllib.request

BASE = 'https://design.loire-atlantique.fr'
STYLESHEETS = ['/css/cd44.css', '/css/icons.css']
EXCLUDED = re.compile(r'HansomFYW05|ModernMTStd')
POPPINS_LICENSE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt'
POPPINS_SUBSETS = {'latin', 'latin-ext'}
# Google Fonts picks the format from the browser: ask for woff2.
USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
STATIC = pathlib.Path(__file__).resolve().parent.parent / 'static'


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def save(path, content):
    target = STATIC / path.lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(content)


def copy_poppins(import_url):
    """Copy Poppins locally and return the stylesheet declaring it."""
    css = fetch(import_url).decode()
    blocks = re.findall(r'/\* ([\w-]+) \*/\s*(@font-face \{.*?\})', css, re.S)
    kept = []
    for subset, block in blocks:
        if subset not in POPPINS_SUBSETS:
            continue
        for url in re.findall(r'url\((https://[^)]+)\)', block):
            name = f'{subset}-{posixpath.basename(url)}'
            save(f'/fonts/poppins/{name}', fetch(url))
            block = block.replace(url, f'../fonts/poppins/{name}')
        kept.append(f'/* {subset} */\n{block}')
    save('/fonts/poppins/OFL.txt', fetch(POPPINS_LICENSE))
    return '\n'.join(kept) + '\n', len(kept)


def main():
    missing = []
    for sheet in STYLESHEETS:
        css = fetch(BASE + sheet).decode()

        google = re.search(r'@import url\("(https://fonts\.googleapis\.com/[^"]+)"\);', css)
        if google:
            poppins_css, count = copy_poppins(google.group(1))
            save('/css/poppins.css', poppins_css.encode())
            css = css.replace(google.group(0), '@import url("poppins.css");')
            print(f'Poppins: {count} declarations copied')

        references = {
            re.sub(r'[?#].*', '', ref)
            for ref in re.findall(r'url\(["\']?([^"\')]+)', css)
            if not ref.startswith(('data:', 'http:', 'https:', 'poppins.css'))
        }
        for ref in sorted(references):
            path = posixpath.normpath(posixpath.join(posixpath.dirname(sheet), ref))
            if EXCLUDED.search(path):
                continue
            try:
                save(path, fetch(BASE + path))
            except urllib.error.HTTPError as error:
                missing.append(f'{path} ({error.code})')
        save(sheet, css.encode())
        print(f'{sheet}: {len(references)} referenced files')

    for path in missing:
        print(f'Missing on the CD44 server: {path}')


if __name__ == '__main__':
    main()
