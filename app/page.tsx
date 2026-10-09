"use client";

import { useState } from "react";
import SiteHeader from "./components/site-header";

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
const Bolt = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-9 12h7l-1 8 10-13h-7V2Z" /></svg>;

const paths = [
  ["Esportes", "6 questões", "#c93635", "Futebol, olimpismo e inclusão."],
  ["Corpo e saúde", "5 questões", "#007c78", "Bem-estar, mídia e qualidade de vida."],
  ["Lutas", "4 questões", "#e7ad29", "História, cultura e respeito."],
  ["Danças", "3 questões", "#31528c", "Expressão, ritmo e identidade."],
];

export default function Home() {
  const [answer, setAnswer] = useState<string | null>(null);
  const isCorrect = answer === "B";
  return <main>
      <SiteHeader active="home" />
    <section className="hero" id="inicio">
      <div className="hero-copy"><p className="kicker"><span /> Educação Física no ENEM</p><h1>Estudar também é entrar em movimento.</h1><p className="hero-lead">Questões reais, trilhas por tema e desafios para você chegar ao ENEM com repertório e confiança.</p><div className="hero-actions"><a className="button primary" href="#trilhas">Encontrar minha trilha <Arrow /></a><a className="button quiet" href="#acervo">Ver questões por ano</a></div><div className="hero-note"><span className="pulse" /> Conteúdo para o Ensino Médio</div></div>
      <div className="hero-visual" aria-label="Ilustração abstrata de uma pista de atletismo" role="img"><div className="track track-one" /><div className="track track-two" /><div className="track track-three" /><div className="finish">ENEM<br /><b>2026</b></div><span className="runner">↗</span></div>
    </section>
    <section className="quick-start" aria-labelledby="quick-title"><div><p className="section-label">COMECE POR AQUI</p><h2 id="quick-title">O que você quer fazer hoje?</h2></div><div className="quick-grid"><a href="/desafio"><span className="icon red"><Bolt /></span><b>Resolver um desafio</b><small>5 questões rápidas para aquecer</small><Arrow /></a><a href="#trilhas"><span className="icon teal">◎</span><b>Estudar por tema</b><small>Escolha seu próximo treino</small><Arrow /></a><a href="/acervo"><span className="icon blue">↗</span><b>Revisar por ano</b><small>Acervo ENEM de 2009 a 2024</small><Arrow /></a></div></section>
    <section className="paths" id="trilhas" aria-labelledby="paths-title"><div className="section-intro"><p className="section-label">TRILHAS DE ESTUDO</p><h2 id="paths-title">Cada tema é uma nova forma de entender o corpo e o mundo.</h2><p>Escolha uma trilha, responda questões e acompanhe seu progresso.</p></div><div className="path-grid">{paths.map(([title, count, color, description], index) => <article className="path-card" key={title} style={{ "--path": color } as React.CSSProperties}><div className="path-number">0{index + 1}</div><div><h3>{title}</h3><p>{description}</p></div><footer><span>{count}</span><a href="#desafio" aria-label={`Começar trilha ${title}`}><Arrow /></a></footer></article>)}</div></section>
    <section className="collection" id="acervo" aria-labelledby="collection-title"><div><p className="section-label">ACERVO DE QUESTÕES</p><h2 id="collection-title">Questões reais. Respostas que fazem sentido.</h2><p>Organizamos o acervo por ano e tema para seu estudo render mais.</p></div><div className="collection-stat"><strong>15</strong><span>anos de ENEM<br />para revisar</span></div><div className="years"><span>2009</span><i /><span>2012</span><i /><span>2016</span><i /><span>2020</span><i /><b>2024</b></div><a className="text-link" href="/acervo">Explorar o acervo completo <Arrow /></a></section>
    <section className="challenge" id="desafio" aria-labelledby="challenge-title"><div className="challenge-title"><p className="section-label">DESAFIO DA SEMANA</p><h2 id="challenge-title">Pronto para sair do aquecimento?</h2><p>Uma questão por dia para colocar seu repertório em jogo.</p><div className="challenge-meta"><span>◷ 03 min</span><span>Questão 1 de 5</span></div></div><div className="question-card"><p className="question-tag">CULTURA CORPORAL</p><h3>As práticas corporais de aventura na natureza favorecem, entre outros aspectos, a:</h3><div className="answers">{[["A", "padronização dos movimentos."], ["B", "interação responsável com o ambiente."], ["C", "competição exclusiva entre atletas."], ["D", "substituição da atividade coletiva."]].map(([letter, text]) => <button key={letter} className={answer === letter ? (isCorrect ? "correct" : "wrong") : ""} onClick={() => setAnswer(letter)}><b>{letter}</b>{text}</button>)}</div>{answer && <p className={isCorrect ? "feedback success" : "feedback"}>{isCorrect ? "Boa! A aventura também ensina cuidado, autonomia e relação com a natureza." : "Quase. Pense no que a prática permite experimentar além da competição."}</p>}</div></section>
    <section className="about" id="sobre"><div className="about-stamp">EF<br /><span>+</span><br />ENEM</div><div><p className="section-label">EDUCAÇÃO FÍSICA</p><h2>Educação Física é conhecimento que se vive.</h2><p>Um espaço para estudar, perguntar e construir uma leitura crítica sobre corpo, cultura e saúde no ENEM.</p><a className="text-link" href="/acervo">Explorar questões <Arrow /></a></div></section>
    <footer><a className="brand" href="#inicio"><span className="brand-mark">E</span><span><strong>Estudar</strong><small>ENEM</small></span></a><p>© 2026 Estudar ENEM</p><a href="#inicio">Voltar ao topo ↑</a></footer>
  </main>;
}
