import os
import argparse
import json
import base64
import time
import requests
from pathlib import Path

# ---------------------------
# Config
# ---------------------------

API_KEY = "sk-slsi6wy2h7gmjh0a9rb5dbsxdmwllg6ihabg720tnzqy5jts"

API_URL = "https://api.xiaomimimo.com/v1/chat/completions"
MODEL = "mimo-v2.5-tts-voiceclone"

VOICE_SAMPLE_PATH = "output.mp3"


# ---------------------------
# Args
# ---------------------------

parser = argparse.ArgumentParser()

parser.add_argument(
    "root",
    help="root folder OR single *_voices.json file"
)

parser.add_argument(
    "--force",
    action="store_true",
    help="overwrite existing mp3 files"
)

parser.add_argument(
    "--only",
    help="generate only a specific mp3 (e.g. instructions.mp3)"
)

args = parser.parse_args()

ROOT = Path(args.root)
FORCE_REGEN = args.force
ONLY_FILE = args.only


# ---------------------------
# Load reference voice
# ---------------------------

with open(VOICE_SAMPLE_PATH, "rb") as f:
    voice_base64 = base64.b64encode(f.read()).decode("utf-8")

VOICE_DATA_URI = f"data:audio/mpeg;base64,{voice_base64}"


# ---------------------------
# Extract voice items
# ---------------------------

def extract_voice_items(obj):
    results = []

    if isinstance(obj, dict):
        if "text" in obj:
            results.append(obj)

        for v in obj.values():
            results.extend(extract_voice_items(v))

    elif isinstance(obj, list):
        for item in obj:
            results.extend(extract_voice_items(item))

    return results


# ---------------------------
# TTS call
# ---------------------------

def generate_audio(text):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": ""},
            {"role": "assistant", "content": text}
        ],
        "audio": {
            "format": "mp3",
            "voice": VOICE_DATA_URI
        }
    }

    r = requests.post(
        API_URL,
        headers={
            "api-key": API_KEY,
            "Content-Type": "application/json"
        },
        json=payload,
        timeout=120
    )

    r.raise_for_status()
    data = r.json()

    audio_b64 = data["choices"][0]["message"]["audio"]["data"]
    return base64.b64decode(audio_b64)


# ---------------------------
# Collect JSON files
# ---------------------------

if ROOT.is_file():
    json_files = [ROOT]
else:
    json_files = list(ROOT.rglob("*_voices.json"))

print(f"Found {len(json_files)} JSON files")


# ---------------------------
# Process
# ---------------------------

for json_path in json_files:

    print(f"\nProcessing: {json_path}")

    try:
        raw = json.loads(json_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"Skipping invalid JSON: {e}")
        continue

    items = extract_voice_items(raw)

    if not items:
        print("No voice items found")
        continue

    print(f"Found {len(items)} voice items")

    for i, item in enumerate(items):

        text = item.get("text")
        mp3_name = item.get("mp3")

        if not text:
            continue

        if not mp3_name:
            mp3_name = f"auto_{i}.mp3"

        # ---------------------------
        # ONLY filter
        # ---------------------------
        if ONLY_FILE and mp3_name != ONLY_FILE:
            continue

        output_file = json_path.parent / mp3_name

        # ---------------------------
        # skip / force logic
        # ---------------------------
        if output_file.exists() and not FORCE_REGEN:
            print(f"Skip (exists): {output_file}")
            continue

        try:
            if output_file.exists():
                print(f"Re-generating: {output_file}")
            else:
                print(f"Generating: {output_file}")

            audio_bytes = generate_audio(text)
            output_file.write_bytes(audio_bytes)

            time.sleep(0.2)

        except Exception as e:
            print(f"Failed: {mp3_name} -> {e}")

print("\nALL DONE ✔")
