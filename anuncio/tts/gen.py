import sys, wave
from piper import PiperVoice, SynthesisConfig
v = PiperVoice.load("pt_BR-faber-medium.onnx")
lines = {
 "l1": "Você quer ajudar uma criança autista, mas nem sempre sabe como apoiar a comunicação e a aprendizagem?",
 "l2": "Com orientação clara e estratégias respeitosas, você pode aprender formas de apoiar o desenvolvimento no dia a dia.",
 "l3": "Conheça o Aba e Autismo na Prática. Um curso introdutório, com aulas por módulos, exemplos práticos, e estudo no seu ritmo.",
 "l4": "Conheça o curso por dezenove reais e noventa centavos. Clique em Saiba mais, e veja todos os detalhes.",
}
ls = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0
for k, t in lines.items():
    with wave.open(f"{k}.wav", "wb") as w:
        v.synthesize_wav(t, w, syn_config=SynthesisConfig(length_scale=ls, noise_scale=0.6, noise_w_scale=0.8))
