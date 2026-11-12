# Changelog

Este arquivo segue o formato Keep a Changelog e o versionamento semântico (SemVer).

## [Unreleased]

### Added
- Projeto `gob-sync` (Sincronização do Crédito Trabalhador) em produção, com documentação completa.
- Dono do processo, responsável e medidas de sucesso no PDD.
- Coordenação de TI no escalonamento do runbook e na skill.
- Testes de borda com dados falsos em `testes/` e `docs/testes.md`.
- Fluxo de mudança por branch e pull request no README, no SDD e na skill.
- Procedimento de rollback no runbook, com teste registrado.
- ADR 0003: mudanças por pull request.
- Situação de cada projeto: em andamento, em produção, pausado ou desativado. A página mostra um selo e um filtro.
- Datas opcionais de início e de última mudança em cada projeto.
- ADR 0004: situação e datas no JSON, para integrações futuras.
- Testes de borda de situação e de datas.

### Changed
- A skill `portfolio-sistemas` passou a se chamar `projeto`.
- O portfólio mostra os projetos desde o início, e não só as automações em produção.
- A contagem da página diz "projetos" em vez de "automações".
- A forma de execução aceita o valor "A definir".

### Removed
- A cópia da skill saiu do repositório. A skill fica só na conta do claude.ai.

### Fixed
- A data "Lista atualizada em" mostra 11/11/2026, a data da inclusão da situação.
- A página ignora projetos com campo vazio, valor fora do padrão ou `id` repetido.
- A busca encontra cada palavra em separado.
- Uma área fora da lista `areas` ganha botão de filtro.
- Nomes e resumos longos quebram a linha em tela estreita.
- A API de sindicatos mostra a documentação completa.
- Links de Omie, Crédito do Trabalhador e Proxy nWeb apontam para os repositórios reais da organização.

## [1.0.0] - 2026-11-10

### Added
- Página do portfólio com busca e filtro por área.
- Lista `projetos.json` com as 16 automações em produção.
- Selos de execução, situação da documentação e migração do repositório.
- Links para PDD, SDD, runbook e ADRs nos projetos com documentação completa.
- Skill `portfolio-sistemas` para incluir e alterar projetos no padrão.
