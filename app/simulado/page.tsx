import SiteHeader from "../components/site-header";

const years = Array.from({ length: 15 }, (_, index) => 2023 - index);

export default function SimuladoPage() {
  return (
    <main className="simulado-page">
      <SiteHeader active="simulado" />

      <section className="page-hero simulado-hero">
        <p className="kicker"><span /> Simulados ENEM</p>
        <h1>Escolha um ano e encare a prova no seu ritmo.</h1>
        <p>Cada edição reúne as questões daquele ano. Quer uma prova nova? Escolha a quantidade e gere uma combinação única.</p>
        <form className="custom-exam-form" action="/simulado/novo" method="get">
          <label htmlFor="simulado-amount">Quantidade de questões</label>
          <div>
            <input id="simulado-amount" name="amount" type="number" min="1" max="90" defaultValue="90" required />
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
