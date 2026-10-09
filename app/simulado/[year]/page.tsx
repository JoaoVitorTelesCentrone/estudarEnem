"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SiteHeader from "../../components/site-header";

type Question = { title: string; index: number; discipline: string; language: string | null; year: number; context: string | null };

export default function YearExamPage() {
  const params = useParams<{ year: string }>();
  const year = params.year;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/enem/exam?year=${year}`)
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); return data.questions as Question[]; })
      .then((items) => { if (active) setQuestions(items); })
      .catch((err) => { if (active) setError(err instanceof Error ? err.message : "Não foi possível carregar este simulado."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [year]);

  return (
    <main className="simulado-page">
      <SiteHeader active="simulado" />
      <section className="simulado-year-head"><a className="back-link" href="/simulado">← Todos os anos</a><p className="kicker"><span /> Simulado ENEM</p><h1>Questões de {year}</h1><p>{loading ? "Carregando a prova completa…" : `${questions.length} questões disponíveis nesta edição.`}</p></section>
      <section className="exam-list">
        {loading && <div className="result-card challenge-loading"><div className="reader-loading"><span /> Buscando questões da edição…</div></div>}
        {error && <div className="result-card"><h2>Não foi possível abrir este ano.</h2><p>{error}</p><a className="button primary" href="/simulado">Escolher outro ano</a></div>}
        {!loading && !error && questions.map((question) => <article className="exam-question" key={question.index}><div className="exam-question-index">{String(question.index).padStart(2, "0")}</div><div><span className="theme-tag">{question.discipline}{question.language ? ` · ${question.language}` : ""}</span><h2>{question.title}</h2><p>{question.context ? question.context.replace(/\*\*/g, "").slice(0, 220) + (question.context.length > 220 ? "…" : "") : "Questão sem contexto textual."}</p></div><a href={`/acervo?year=${year}&question=${question.index}`} aria-label={`Abrir questão ${question.index}`}>Abrir →</a></article>)}
      </section>
    </main>
  );
}
