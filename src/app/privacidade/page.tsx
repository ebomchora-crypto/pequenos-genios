import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Política de privacidade (LGPD)" };

export default function Privacidade() {
  return (
    <LegalShell title="Política de privacidade (LGPD)">
      <p>Esta página explica como tratamos dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
      <h2>Dados tratados</h2>
      <ul>
        <li>Dados informados no checkout (como nome, e-mail e dados de pagamento) são tratados pela plataforma de pagamento, que processa o pagamento. Esta página não armazena dados de cartão.</li>
        <li>Medição de audiência e de origem de campanhas (Meta Pixel, Utmify e, quando configurado, Google Analytics) é ativada somente após o seu consentimento.</li>
        <li>Para exibir avisos de novas inscrições, guardamos apenas um identificador anonimizado e o horário da confirmação, sem nome, e-mail, telefone ou dados de pagamento.</li>
      </ul>
      <h2>Seus direitos</h2>
      <p>
        Você pode solicitar acesso, correção, eliminação e portabilidade dos seus dados, e revogar o consentimento a
        qualquer momento, pelo contato informado abaixo.
      </p>
    </LegalShell>
  );
}
