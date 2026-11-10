# Testes de borda

Este documento registra os casos de borda da página e o resultado esperado.

Todos os casos usam dados falsos. Nenhum caso usa um projeto real.

## Como executar

1. Gere as pastas dos casos fora do repositório:

   ```bash
   python testes/montar_casos.py . ../casos-portfolio
   ```

2. Inicie um servidor local na pasta gerada:

   ```bash
   python -m http.server 8041 --bind 127.0.0.1 --directory ../casos-portfolio
   ```

3. Abra `http://127.0.0.1:8041/<caso>/` para cada caso da tabela.
4. Compare a página com a coluna "Resultado esperado".
5. Abra o console do navegador nos casos com aviso.

Aviso: não gere as pastas dentro do repositório. O GitHub Pages publicaria os casos.

## Casos

| Caso | Situação | Resultado esperado |
|---|---|---|
| `json-invalido` | JSON com erro de sintaxe. | Mensagem "Não foi possível carregar a lista de automações". |
| `sem-arquivo` | `projetos.json` não existe. | Mensagem de erro de carga. |
| `sem-chave-projetos` | JSON sem a chave `projetos`. | Mensagem de erro de carga. |
| `lista-vazia` | Lista sem projetos. | "0 de 0 automações" e "Nenhuma automação encontrada". |
| `campos-vazios` | `nome` e `resumo` vazios. | Projeto ignorado. Aviso no console. |
| `campos-ausentes` | Só `id` e `repositorio`. | Projeto ignorado. Aviso no console. |
| `links-invalidos` | Links `javascript:`, externo, domínio parecido, `http://` e número. | Só o projeto válido aparece. |
| `html-no-texto` | HTML e script no nome, no resumo e na área. | O HTML aparece como texto. Nenhum script executa. |
| `texto-longo` | Nome de 120 letras e resumo de 2.600 caracteres. | O texto quebra a linha. Sem rolagem horizontal em 375 px. |
| `acentos` | Nome e resumo com acentos. | A busca "acao ISSQN" encontra o projeto. |
| `id-duplicado` | Dois projetos com o mesmo `id`. | Só o primeiro aparece. Aviso no console. |
| `area-fora-da-lista` | `area` que não está na lista `areas`. | O projeto aparece e ganha um botão de filtro. |
| `valores-estranhos` | `documentacao`, `execucao` e `publicado` fora do padrão. | Projeto ignorado. Aviso no console. |
| `volume-500` | 500 projetos. | A lista carrega. A busca responde em menos de 50 ms. |

## Última execução

Data: 10/11/2026. Navegador: Chromium do painel do Claude, em 375 px de largura.

| Rodada | Resultado |
|---|---|
| 1ª | 7 casos passaram. 7 falharam: `campos-vazios`, `campos-ausentes`, `texto-longo`, `acentos`, `id-duplicado`, `area-fora-da-lista` e `valores-estranhos`. |
| 2ª, depois das correções | 14 casos passaram. A lista real mostrou 16 de 16 automações, sem aviso no console. |
