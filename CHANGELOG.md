# Changelog

Este arquivo segue o formato Keep a Changelog e o versionamento semântico (SemVer).

## [Unreleased]

### Added
- Dono do processo, responsável e medidas de sucesso no PDD.
- Coordenação de TI no escalonamento do runbook e na skill.
- Testes de borda com dados falsos em `testes/` e `docs/testes.md`.
- Fluxo de mudança por branch e pull request no README, no SDD e na skill.
- Procedimento de rollback no runbook, com teste registrado.
- ADR 0003: mudanças por pull request.

### Changed
- A skill `portfolio-sistemas` passou a se chamar `projeto`. A cópia fica em `skill/projeto/SKILL.md`.

### Fixed
- A página ignora projetos com campo vazio, valor fora do padrão ou `id` repetido.
- A busca encontra cada palavra em separado.
- Uma área fora da lista `areas` ganha botão de filtro.
- Nomes e resumos longos quebram a linha em tela estreita.
- Links de Omie, Crédito do Trabalhador e Proxy nWeb apontam para os repositórios reais da organização.

## [1.0.0] - 2026-11-10

### Added
- Página do portfólio com busca e filtro por área.
- Lista `projetos.json` com as 16 automações em produção.
- Selos de execução, situação da documentação e migração do repositório.
- Links para PDD, SDD, runbook e ADRs nos projetos com documentação completa.
- Skill `portfolio-sistemas` para incluir e alterar projetos no padrão.
