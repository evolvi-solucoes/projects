# SDD: Consulta ao portfólio de automações

*Solution Design Document*. Este documento descreve como a página executa o processo do PDD (`docs/pdd.md`).

## 1. Visão geral

Uma página estática no GitHub Pages lê o arquivo `projetos.json` e mostra um cartão para cada automação.

Cada cartão tem o nome com link para o repositório, o resumo e os selos de classificação.

## 2. Fluxo

1. O navegador abre `index.html`.
2. O `app.js` baixa o `projetos.json`, sem cache.
3. O `app.js` descarta todo projeto com campo vazio, valor fora do padrão, link fora de `https://github.com/` ou `id` repetido.
4. O `app.js` ordena os projetos pela ordem da lista `areas` e depois pelo nome.
5. O `app.js` monta os cartões só com `textContent`. Nenhum texto do JSON vira HTML.
6. A busca e o filtro por área redesenham a lista no navegador.

Para alterar a lista:

1. A pessoa usa a skill `projeto`.
2. A skill lê a documentação da automação e propõe a entrada do JSON.
3. A pessoa grava a entrada numa branch própria.
4. A pessoa abre um pull request para a `main`.
5. A Coordenação de TI aprova o pull request.
6. A pessoa faz o merge com **Rebase and merge**.
7. O GitHub Pages publica a alteração.

## 3. Sistemas envolvidos
| Sistema | Uso | Acesso |
|---|---|---|
| GitHub (`evolvi-solucoes/projects`) | Guarda o código e o JSON. | Membros da organização com permissão de escrita. |
| GitHub Pages | Publica a página. | Público, só leitura. |
| Repositórios das automações | Destino dos links. | Conforme a visibilidade de cada repositório. |

## 4. Credenciais
Guarde todas as credenciais em variáveis de ambiente.
Não grave credenciais no código nem nos logs.

A página não usa credenciais. O push usa a conta GitHub de quem altera a lista.

## 5. Tratamento de erro
| Erro | Tentativas | Ação final |
|---|---|---|
| `projetos.json` não carrega ou tem JSON inválido. | Nenhuma. | A página mostra "Não foi possível carregar a lista de automações". |
| Projeto com campo vazio, valor fora do padrão ou link fora do GitHub. | Nenhuma. | O projeto não aparece. O console do navegador mostra o `id`. |
| Dois projetos com o mesmo `id`. | Nenhuma. | Só o primeiro aparece. O console do navegador mostra o `id`. |
| Área que não está na lista `areas`. | Nenhuma. | O projeto aparece e ganha um botão de filtro. |
| Busca sem resultado. | Nenhuma. | A página mostra "Nenhuma automação encontrada". |

## 6. Logs e monitoramento

A página não grava log. O histórico de alterações fica nos commits do repositório.

A aba **Actions** do GitHub mostra o resultado de cada publicação do Pages.

## 7. Decisões relacionadas
- [ADR 0001: Página estática com lista em JSON](adr/0001-pagina-estatica-com-json.md)
- [ADR 0002: Página pública só com resumo de negócio](adr/0002-pagina-publica-so-com-resumo.md)
- [ADR 0003: Mudanças por pull request](adr/0003-mudancas-por-pull-request.md)
