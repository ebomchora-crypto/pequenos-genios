import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { product } from "@/lib/product";

export const metadata: Metadata = { title: "Termos de uso" };

export default function Termos() {
  return (
    <LegalShell title="Termos de uso">
      <p>
        Estes termos descrevem o uso do site e do curso livre introdutório “{product.name}”. Ao se inscrever, você
        declara estar ciente das condições abaixo.
      </p>
      <h2>Natureza do curso</h2>
      <ul>
        <li>É um curso livre introdutório, de caráter educativo e informativo.</li>
        <li>Não equivale a graduação, especialização ou habilitação profissional e não autoriza a prestar terapia ou atendimento clínico.</li>
        <li>Não possui reconhecimento do MEC e não garante resultados.</li>
        <li>O certificado, quando emitido, é de participação.</li>
      </ul>
      <h2>Conteúdo e acesso</h2>
      <p>
        O acesso é pessoal e destinado ao comprador. O conteúdo não deve ser redistribuído sem autorização do
        responsável. Os itens incluídos são os descritos na página de oferta no momento da compra.
      </p>
      {product.refundPolicy ? (
        <>
          <h2>Reembolso</h2>
          <p>{product.refundPolicy}</p>
        </>
      ) : null}
    </LegalShell>
  );
}
