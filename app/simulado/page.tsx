import SiteHeader from "../components/site-header";
import { catalog } from "../data/catalog";

const years = Array.from(new Set(catalog.map((question) => question.ano))).sort((a, b) => b - a);

export default function SimuladoPage() {
  return (
    <main className="simulado-page">
      <SiteHeader active="simulado" />

      <section className="page-hero simulado-hero">
        <p className="kicker"><span /> Simulados de Educação Física</p>
        <h1>Escolha um ano e encare as questões no seu ritmo.</h1>
        <p>Cada edição reúne apenas as questões de Educação Física identificadas para aquele ano. Quer um treino novo? Escolha a quantidade e gere uma combinação única.</p>
        <form className="custom-exam-form" action="/simulado/novo" method="get">
          <label htmlFor="simulado-amount">Quantidade de questões</label>
          <div>
            <input id="simulado-amount" name="amount" type="number" min="1" max={catalog.length} defaultValue={catalog.length} required />
            <button className="button primary" type="submit">Criar simulado <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </section>

      <section className="exam-grid">
        {years.map((year) => (
          <a className="exam-card" href={`/simulado/${year}`} key={year}>
            <span className="exam-label">ENEM</span>
            <strong>{year}</strong>
            <span className="exam-action">Ver questões →</span>
          </a>
        ))}
      </section>
    </main>
  );
}
