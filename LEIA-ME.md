# Base ENEM Educação Física 2015–2025

Esta entrega é um **catálogo preliminar de identificadores**, não uma transcrição validada das questões. Os campos não conferidos permanecem `null`.

## Fontes
- INEP: `https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/<ANO>`
- Identificação 2016–2025: `https://www.memorizevestibular.com/blog/questoes/materia/educacao-fisica`
- Identificação 2015: `https://questoesenem.app/provas/enem-2015/questao-133/`

## Processo necessário
1. Selecionar a prova **regular de Linguagens** de uma única cor por ano no INEP. Em 2015, Linguagens foi no 2º dia; em edições posteriores, confirmar o dia pela página oficial.
2. Baixar a prova e gabarito da **mesma cor, edição e aplicação**.
3. Converter os números 1–45 dos catálogos externos para os números do caderno oficial (não presumir deslocamento fixo sem conferir).
4. Extrair enunciados, alternativas, tabelas e figuras do PDF, preservando imagens com referência à página.
5. Conferir manualmente layout, trechos não extraídos, ordenação e identificação temática.
6. Comparar o gabarito com o PDF oficial.
7. Somente mudar `verificacao.estado` para `validada` depois de confirmar conteúdo, imagem e resposta.

## Critério de publicação
`verificacao.estado == "validada"` e `gabarito_oficial != null` e todos os textos de alternativas presentes.

## Observação
Os materiais públicos devem ser avaliados quanto a direitos autorais e reutilização, especialmente imagens e transcrições integrais em um produto comercial.
