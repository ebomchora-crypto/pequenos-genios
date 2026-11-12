#!/usr/bin/env bash
# Recorta, enquadra 9:16 e unifica a cor dos takes do Pexels. Uso: ./preparar-clips.sh (requer raw/<id>.mp4)
set -e
GRADE="eq=contrast=1.06:brightness=0.012:saturation=1.12,colorbalance=rs=0.025:gs=0.005:bs=-0.025:rm=0.015:bm=-0.01"
clip() { # nome id inicio duracao centro_x(0-1, ignorado em vertical)
  local out=public/clips/$1.mp4 src=raw/$2.mp4
  local w=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 $src)
  local h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 $src)
  local vf
  if [ "$w" -lt "$h" ]; then vf="scale=1080:1920"; else
    vf="crop=ih*9/16:ih:max(0\,min(iw-ih*9/16\,iw*$5-ih*9/32)):0,scale=1080:1920:flags=lanczos"; fi
  ffmpeg -v error -y -ss $3 -t $4 -i $src -an -vf "$vf,$GRADE,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 19 -movflags +faststart $out
  echo "$1 ok"
}
clip c1-licao-tablet     5302510 1.0 4.0 0.47
clip c2-desenho-mae      4499352 3.0 4.0 0.58
clip c3-professora       5897652 1.0 3.0 0.5
clip c4-brincadeira-mae  6168435 12.0 3.0 0.58
clip c5-alfabeto         7343494 14.0 2.5 0.60
clip c6-trenzinho        4016828 4.0 2.0 0.62
clip c7-pai-desenho      4016646 1.5 5.0 0.52
clip c8-pai-filha-risos  8942968 4.5 3.5 0.74
clip c9-blocos           3681880 6.0 3.5 0.45
clip c10-sala-aula       8342240 4.0 3.5 0.42
