# Anúncio 30 s — ABA e Autismo na Prática

Vídeo final: `out/anuncio-aba-autismo-30s.mp4` (1080×1920, 30 fps, H.264 + AAC, −16 LUFS).

## Roteiro final (narração)
| Tempo | Cena | Fala |
|---|---|---|
| 0–6 s | Dor | Você quer ajudar uma criança autista, mas nem sempre sabe como apoiar a comunicação e a aprendizagem? |
| 6–12,5 s | Solução | Com orientação clara e estratégias respeitosas, você pode aprender formas de apoiar o desenvolvimento no dia a dia. |
| 12,5–22 s | Produto | Conheça o ABA e Autismo na Prática. Um curso introdutório, com aulas por módulos, exemplos práticos, e estudo no seu ritmo. |
| 22–30 s | CTA | Conheça o curso por dezenove reais e noventa centavos. Clique em Saiba mais, e veja todos os detalhes. |

"Materiais para imprimir" foi trocado por "exemplos práticos" porque os PDFs ainda não estão disponíveis na área de membros. Quando estiverem, troque a fala 3 em `tts/gen.py`, o rótulo do segundo benefício em `src/Scenes.tsx` e renderize de novo.

## Como reconstruir
```bash
npm install
xargs -L 1 sh -c 'curl -s -o "raw/$0.mp4" "$1"' < fontes-pexels.txt   # baixa os vídeos (mkdir raw antes)
./preparar-clips.sh                                                  # recorte 9:16 + correção de cor
python3 audio-src/trilha_e_sfx.py                                    # trilha e efeitos (já gerados em public/audio)
npm run studio                                                       # pré-visualizar
npm run render                                                       # gera out/anuncio-aba-autismo-30s.mp4
```
Narração: Piper TTS (voz `pt_BR-faber-medium`, Hugging Face `rhasspy/piper-voices`), gerada por `tts/gen.py` e masterizada com ffmpeg (EQ, compressão e loudnorm). Para trocar por ElevenLabs, substitua `public/audio/l1..l4.wav` mantendo os tempos de `src/theme.ts`.

## Licenças e créditos
- **Vídeos:** Pexels (licença gratuita, uso comercial permitido, sem exigência de atribuição), vídeos 5302510, 4499352, 5897652, 6168435, 7343494, 4016828, 4016646, 8942968, 3681880 e 8342240 (links em `fontes-pexels.txt`). Pessoas nas imagens são ilustrativas, e o vídeo traz o aviso "Imagens ilustrativas".
- **Trilha e efeitos:** compostos e sintetizados do zero em `audio-src/trilha_e_sfx.py`. São obra original, sem licença de terceiros.
- **Fonte:** Nunito (SIL Open Font License).
- **Remotion:** gratuito para pessoas físicas e empresas com até 3 funcionários. Acima disso, exige licença da empresa (remotion.pro).
