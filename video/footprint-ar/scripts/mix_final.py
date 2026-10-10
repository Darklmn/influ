"""Mix the rendered video (music + SFX bed, already ducked) with the voice-over and master
for TikTok / Reels: -14 LUFS integrated, -1 dBTP, two-pass loudnorm (linear).

Usage: python3 scripts/mix_final.py <video_with_bed.mp4> <vo.wav> <out.mp4>
"""
import json
import re
import subprocess
import sys

video, vo, out = sys.argv[1:4]

VOICE = (
    "[1:a]aresample=48000,highpass=f=80,equalizer=f=3500:t=q:w=1.2:g=2,"
    "acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=3,pan=stereo|c0=c0|c1=c0[vo];"
    "[0:a]aresample=48000[bed];"
    "[vo][bed]amix=inputs=2:duration=longest:normalize=0"
)

# pass 1 — measure
p1 = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", video, "-i", vo, "-filter_complex",
     VOICE + ",loudnorm=I=-14:TP=-1.0:LRA=11:print_format=json", "-f", "null", "-"],
    capture_output=True, text=True, check=True,
)
m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", p1.stderr, re.S).group(0))

# pass 2 — apply (linear)
ln = (
    f"loudnorm=I=-14:TP=-1.0:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
    f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
)
subprocess.run(
    ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", video, "-i", vo,
     "-filter_complex", VOICE + "," + ln + ",aresample=48000[a]",
     "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k",
     "-movflags", "+faststart", out],
    check=True,
)
print("measured", m["input_i"], "LUFS ->", out)
