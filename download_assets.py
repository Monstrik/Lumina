import os
import urllib.request
import re
from urllib.parse import urlparse

TARGET_DIR = "/Users/alex/.gemini/antigravity/scratch/positive-affirmations/images"
os.makedirs(TARGET_DIR, exist_ok=True)

LOGO_URL = "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/04.png?v=1750825546"

IMAGES = [
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/1_75e768b6-7a72-4a65-bb98-c280724d2d8f.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/2_73baee18-5366-4424-95a3-43f845823f92.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/4_a88e4228-1172-475d-8c94-16286cae0d06.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/5_acc1763e-9850-4392-8c6e-2c7e17210d0f.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/6_95365df4-95db-4857-990e-eacf23b68c50.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/7_f54a3006-1582-409c-8a36-ab8d9e7c5bfd.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/8.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/9.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/10.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/11.png?v=1750839283?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/12.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/13.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/14.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/15.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/16.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/17.png?v=1750839283?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/18.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/19.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/20.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/21.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/22.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/23.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/24.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/25.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/26.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/27.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/28.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/29.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/30.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/31.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/32.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/33.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/34.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/35.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/37.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/38.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/39.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/40.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/41.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/42.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/43.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/44.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/45.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/46.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/47.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/48.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/49.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/50.png?v=1750839284?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/jesus_1.jpg?v=1782115717?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/jesus_3.png?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/jesus_4.png?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/grim_reaper_1.png?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/grim_reaper_2.jpg?v=1782115719?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/grim_reaper_3.png?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/grim_reaper_4.jpg?v=1782115719?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/bat_1.png?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/bat_2.jpg?v=1782115720?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/boo_1.png?v=1782115719?auto=format&fit=crop&w=1920&h=1080&q=80",
  "https://cdn.shopify.com/s/files/1/0764/8683/6514/files/boo_2.jpg?v=1782115719?auto=format&fit=crop&w=1920&h=1080&q=80"
]

def get_filename(url, index):
    path = urlparse(url).path
    base = os.path.basename(path)
    # Extract clean name like '1', 'jesus_1', 'grim_reaper_1'
    name, ext = os.path.splitext(base)
    # clean up query params or suffix
    ext = ext.split('?')[0] if '?' in ext else ext
    if not ext:
        ext = '.png'
    # Simplify UUID filenames e.g. 1_75e768b6-... -> 01.png
    m = re.match(r'^(\d+)_.*', name)
    if m:
        num = int(m.group(1))
        return f"{num:02d}{ext}"
    m_num = re.match(r'^(\d+)$', name)
    if m_num:
        num = int(m_num.group(1))
        return f"{num:02d}{ext}"
    return f"{name}{ext}"

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
}

downloaded_filenames = []

# 1. Download logo
logo_dest = os.path.join(TARGET_DIR, "logo.png")
req = urllib.request.Request(LOGO_URL, headers=headers)
try:
    with urllib.request.urlopen(req) as resp, open(logo_dest, 'wb') as f:
        f.write(resp.read())
    print("Downloaded logo.png")
except Exception as e:
    print(f"Failed logo: {e}")

# 2. Download affirmations
for i, url in enumerate(IMAGES):
    fname = get_filename(url, i)
    dest = os.path.join(TARGET_DIR, fname)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        downloaded_filenames.append(f"images/{fname}")
        print(f"[{i+1}/{len(IMAGES)}] Downloaded {fname}")
    except Exception as e:
        print(f"[{i+1}/{len(IMAGES)}] Failed {fname}: {e}")

print("DONE")
print(f"Total downloaded: {len(downloaded_filenames)}")
