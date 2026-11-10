# PDD: Consulta ao portfólio de automações

*Process Definition Document*. Este documento descreve o processo atual, sem tecnologia.

## 1. Objetivo

Dar a qualquer pessoa da equipe um ponto único para conhecer as automações e acessar cada uma.

Sem esse ponto, a pessoa precisa perguntar à equipe de TI (Tecnologia da Informação) o que existe e onde fica.

Papéis:

| Papel | Responsabilidade |
|---|---|
| Coordenação de TI | Dona do processo. Decide o que entra na página e aprova cada mudança. |
| Equipe de TI | Responsável pela automação. Mantém a lista de automações e a página. |

Medidas de sucesso:

1. Cobertura de 100%: toda automação em produção aparece na página.
2. Inclusão em até 7 dias: uma automação nova aparece na página até 7 dias depois de entrar em produção.
3. Documentação completa: o número de automações com documentação completa cresce a cada conferência.

## 2. Escopo
- Dentro do escopo:
  - As automações em produção.
  - O nome, o endereço do repositório e o problema que cada automação resolve.
  - A situação da documentação de cada automação.
- Fora do escopo:
  - O estado de execução de cada automação. O supervisor de automações cuida disso.
  - Dados internos: endereços de rede, nomes de clientes e segredos.
  - As automações inativas e as arquivadas.

## 3. Processo atual (as-is)

Responsável: a equipe de TI.

1. A pessoa pergunta à equipe de TI qual automação resolve um problema.
2. A equipe de TI procura a pasta da automação no servidor.
3. A equipe de TI explica o que a automação faz.

## 4. Regras de negócio

1. Toda automação em produção aparece no portfólio.
2. Cada automação tem um resumo do problema que ela resolve, em linguagem de negócio.
3. Uma automação nova entra no portfólio até 7 dias depois de entrar em produção.
4. Uma automação desativada sai do portfólio.
5. A documentação de cada automação segue o padrão de seis documentos: README, CHANGELOG, PDD, SDD, runbook e ADR.
6. A Coordenação de TI aprova toda inclusão, alteração ou remoção.
7. A equipe de TI confere a página contra a lista de automações em produção sempre que uma automação entra ou sai de produção.

## 5. Exceções
| Situação | Ação |
|---|---|
| A automação ainda não tem repositório no GitHub. | Liste a automação com o selo "Repositório em migração". |
| A automação ainda não tem a documentação completa. | Liste a automação com o selo "Documentação pendente" ou "Documentação parcial". |

## 6. Volume

16 automações em produção em 10/11/2026.
