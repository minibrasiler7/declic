# Enregistre les phrases audio des cours de langue avec Kokoro (voix neuronales, licence Apache 2.0), en local.
#
# Installation (une fois), hors du dépôt :
#   mkdir -p ~/.cache/declic-tts && cd ~/.cache/declic-tts
#   uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python kokoro-onnx soundfile
#   curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
#   curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
#   (espeak-ng et ffmpeg : brew install espeak-ng ffmpeg)
# Utilisation, depuis la racine du dépôt :
#   node tools/audio.js /tmp/manifeste.json
#   ~/.cache/declic-tts/.venv/bin/python tools/tts.py /tmp/manifeste.json
import json, os, re, subprocess, sys, time
import numpy as np
from kokoro_onnx import Kokoro

HOME = os.path.expanduser('~/.cache/declic-tts')
OUT = os.path.join(os.path.dirname(__file__), '..', 'audio')
LANG = {'b': 'en-gb', 'a': 'en-us'}

def money(m):
    sym, units, cents = m.group(1), m.group(2).replace(',', ''), m.group(3)
    name = {'£': ('pound', 'pounds'), '$': ('dollar', 'dollars'), '€': ('euro', 'euros')}[sym]
    s = f"{units} {name[0] if units == '1' else name[1]}"
    return s + (f" {int(cents)}" if cents and int(cents) else '')

def speakable(t):
    """Ce que la voix doit lire : prix, heures, pourcentages, et quelques homographes."""
    t = re.sub(r'([£$€])\s?(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d\d))?', money, t)
    t = re.sub(r'\bCHF\s?(\d+)(?:\.(\d\d))?', lambda m: f"{m.group(1)} francs" + (f" {int(m.group(2))}" if m.group(2) and int(m.group(2)) else ''), t)
    def hour(m):
        h, mi = int(m.group(1)), m.group(2)
        if h > 23 or int(mi) > 59: return m.group(0)
        return f"{h} o'clock" if mi == '00' else (f"{h} oh {int(mi)}" if mi[0] == '0' else f"{h} {mi}")
    t = re.sub(r'(?<![\d.,£$€])\b(\d{1,2})[.:](\d\d)\b(?![.,]?\d)', hour, t)
    t = re.sub(r'(\d),(\d{3})\b', r'\1\2', t)
    t = re.sub(r'(\d)\s?%', r'\1 percent', t)
    # read au passé se prononce « red »
    t = re.sub(r"(\b(?:have|has|had)(?:n['’]t)?|['’](?:ve|d))((?: (?:you|he|she|it|we|they|i))?(?: (?:just|already|never|ever|not|yet))?) read\b", r"\1\2 red", t, flags=re.I)
    t = re.sub(r"\b(I|she|he|we|they|you) read (a good book|the paper|the book|three books)\b", r"\1 red \2", t)
    t = re.sub(r'\bsaid\. read\. bought\b', 'said. red. bought', t)
    t = t.replace('→', ',').replace('–', ',').replace('—', ',').replace('…', '.')
    return t

def main():
    todo = json.load(open(sys.argv[1]))
    os.makedirs(OUT, exist_ok=True)
    k = Kokoro(os.path.join(HOME, 'kokoro-v1.0.onnx'), os.path.join(HOME, 'voices-v1.0.bin'))
    t0, done = time.time(), 0
    for c in todo:
        dst = os.path.join(OUT, c['id'] + '.mp3')
        if os.path.exists(dst): continue
        audio, sr = k.create(speakable(c['text']), voice=c['voice'], speed=0.95, lang=LANG[c['voice'][0]])
        pcm = (np.clip(audio, -1, 1) * 32767).astype('<i2').tobytes()
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-',
                        '-af', 'apad=pad_dur=0.05', '-c:a', 'libmp3lame', '-b:a', '48k', dst + '.part.mp3'], input=pcm, check=True)
        os.replace(dst + '.part.mp3', dst)
        done += 1
        if done % 50 == 0: print(f'{done}/{len(todo)} en {int(time.time()-t0)} s', flush=True)
    print(f'fini : {done} fichiers en {int(time.time()-t0)} s', flush=True)

if __name__ == '__main__':
    main()
