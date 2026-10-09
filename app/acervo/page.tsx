"use client";

import { useEffect, useMemo, useState } from "react";
import { catalog, catalogStatus } from "../data/catalog";
import SiteHeader from "../components/site-header";

const years = ["Todos", ...Array.from(new Set(catalog.map((question) => String(question.ano)))).sort((a, b) => Number(b) - Number(a))];
type CatalogQuestion = (typeof catalog)[number];
type ApiQuestion = { title: string; index: number; year: number; context: string | null; correctAlternative: string; alternativesIntroduction: string | null; alternatives: { letter: string; text: string; file: string | null; isCorrect: boolean }[] };

export default function AcervoPage() {
  const [year, setYear] = useState("Todos");
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(20);
  const [selected, setSelected] = useState<CatalogQuestion | null>(null);
  const [remote, setRemote] = useState<ApiQuestion | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const visible = useMemo(() => catalog.filter((question) => (year === "Todos" || String(question.ano) === year) && `${question.ano} ${question.numero_catalogo} ${question.disciplina} ${question.tema ?? ""}`.toLowerCase().includes(search.toLowerCase())).slice(0, amount), [year, search, amount]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeQuestion(); };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", onKey); };
  }, [selected]);

  const closeQuestion = () => { setSelected(null); setRemote(null); setAnswer(null); setError(null); };
  const openQuestion = async (question: CatalogQuestion) => {
    setSelected(question); setRemote(null); setAnswer(null); setError(null); setLoading(true);
    try {
      const response = await fetch(`/api/enem/question?year=${question.ano}&index=${question.numero_catalogo}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Não encontrei esta questão.");
      setRemote(data);
    } catch (err) { setError(err instanceof Error ? err.message : "Não foi possível carregar a questão."); } finally { setLoading(false); }
  };

  const localReady = Boolean(selected?.enunciado && selected.alternativas.every((option) => option.texto) && selected.gabarito_oficial);
  const questionTitle = remote?.title ?? `Questão ${selected?.numero_catalogo} · Educação Física`;
  const correctLetter = remote?.correctAlternative ?? selected?.gabarito_oficial ?? "";
  const correctText = remote?.alternatives.find((option) => option.letter === correctLetter)?.text ?? selected?.alternativas.find((option) => option.letra === correctLetter)?.texto ?? "";
  const selectedText = remote?.alternatives.find((option) => option.letter === answer)?.text ?? "";

  return <main className="inner-page"><SiteHeader active="acervo" />
    <section className="page-hero"><p className="kicker"><span /> Educação Física no ENEM</p><h1>Pratique questões de Educação Física.</h1><p>Escolha quantas questões quer ver e abra qualquer uma para responder.</p></section>
    <section className="archive-layout"><aside className="archive-side"><p className="section-label">FILTRAR POR ANO</p>{years.map((item) => <button className={year === item ? "selected" : ""} onClick={() => setYear(item)} key={item}>{item}<span>{item === "Todos" ? catalog.length : catalog.filter((question) => String(question.ano) === item).length}</span></button>)}<div className="archive-tip"><b>Educação Física.</b><p>Questões organizadas por ano e carregadas completas quando você escolhe responder.</p></div></aside><div className="archive-content"><div className="archive-tools archive-tools-grid"><div><label htmlFor="search">Buscar por ano ou número</label><input id="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: 2024, questão 23..." /></div><div><label htmlFor="amount">Quantidade de questões</label><input id="amount" type="number" min="1" max={catalog.length} value={amount} onChange={(event) => setAmount(Math.max(1, Math.min(catalog.length, Number(event.target.value) || 1)))} /></div></div><p className="result-count">Mostrando {visible.length} questões de Educação Física · {catalogStatus.replaceAll("_", " ")}</p><div className="question-list">{visible.map((question) => <article key={question.id}><div className="question-year">{question.ano}</div><div><span className="theme-tag">Educação Física · {question.aplicacao}</span><h2>Questão {question.numero_catalogo}</h2><p>{question.area} · índice {question.numero_catalogo}</p></div><button className="question-open" onClick={() => void openQuestion(question)}>Responder →</button></article>)}</div>{visible.length === 0 && <div className="empty-state"><h2>Nenhuma questão encontrada.</h2><p>Tente buscar outro ano ou número.</p></div>}</div></section>
    {selected && <div className="question-modal-backdrop" onMouseDown={closeQuestion}><section className="question-reader" id="question-reader" role="dialog" aria-modal="true" aria-labelledby="question-title" onMouseDown={(event) => event.stopPropagation()}><div className="reader-top"><span className="theme-tag">ENEM {selected.ano} · Educação Física</span><button onClick={closeQuestion} aria-label="Fechar questão">Fechar ×</button></div><h2 id="question-title">{questionTitle}</h2>{loading && <div className="reader-loading"><span /> Buscando enunciado e alternativas…</div>}{error && <div className="reader-locked"><strong>Não consegui carregar esta questão agora.</strong><p>{error} Tente novamente em alguns segundos.</p><button className="button primary" onClick={() => void openQuestion(selected)}>Tentar novamente</button></div>}{!loading && !error && (remote || localReady) && <><p className="reader-statement">{remote?.context ?? selected.enunciado}</p>{remote?.alternativesIntroduction && <p className="alternatives-intro">{remote.alternativesIntroduction}</p>}<div className="reader-options">{(remote?.alternatives ?? selected.alternativas.map((option) => ({ letter: option.letra, text: option.texto ?? "", isCorrect: option.letra === selected.gabarito_oficial }))).map((option) => <button key={option.letter} className={answer === option.letter ? (answer === correctLetter ? "answer-right" : "answer-wrong") : ""} onClick={() => setAnswer(option.letter)}><b>{option.letter}</b><span>{option.text}</span></button>)}</div>{answer && <div className={answer === correctLetter ? "reader-feedback good" : "reader-feedback"}><b>{answer === correctLetter ? "Resposta correta." : `Você marcou ${answer}. A resposta correta é ${correctLetter}.`}</b><p>{answer === correctLetter ? `Você acertou a alternativa ${correctLetter}.` : `A alternativa correta é: ${correctText}`}</p>{selectedText && answer !== correctLetter && <small>Sua resposta: {selectedText}</small>}</div>}</>}{!loading && !error && !remote && !localReady && <div className="reader-locked"><strong>Esta questão não veio com conteúdo completo.</strong><p>Tente outro registro ou confira o número da questão no catálogo.</p></div>}</section></div>}
  </main>;
}
