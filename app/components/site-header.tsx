"use client";

import { useState } from "react";

type SiteHeaderProps = { active?: "home" | "acervo" | "simulado" | "redacao" | "desafio" };

const links = [
  ["home", "Início", "/"],
  ["acervo", "Questões", "/acervo"],
  ["simulado", "Simulado", "/simulado"],
  ["redacao", "Redação", "/redacao"],
  ["desafio", "Desafio semanal", "/desafio"],
] as const;

export default function SiteHeader({ active }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <a className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">E</span>
        <span><strong>Estudar</strong><small>ENEM</small></span>
      </a>
      <button className="menu-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true">☰</span><span>{open ? "Fechar" : "Menu"}</span>
      </button>
      <nav className={`inner-nav${open ? " open" : ""}`} aria-label="Navegação principal">
        {links.map(([key, label, href]) => <a className={active === key ? "active" : ""} href={href} key={key} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="/desafio" onClick={() => setOpen(false)}>Começar a estudar</a>
      </nav>
    </header>
  );
}
