"use strict";

// Só aceita links do GitHub: o JSON é editado à mão e um link errado
// não pode levar o leitor a outro site.
const PREFIXO_PERMITIDO = "https://github.com/";

const ROTULO_DOCUMENTACAO = {
  completa: "Documentação completa",
  parcial: "Documentação parcial",
  pendente: "Documentação pendente",
};

const DOCUMENTOS = [
  ["PDD", "docs/pdd.md"],
  ["SDD", "docs/sdd.md"],
  ["Runbook", "docs/runbook.md"],
  ["ADRs", "docs/adr"],
];

const estado = { busca: "", area: "Todas" };
let projetos = [];
let areas = [];

const EXECUCOES = ["Serviço", "Tarefa agendada", "Manual"];

function linkValido(url) {
  return typeof url === "string" && url.startsWith(PREFIXO_PERMITIDO);
}

function textoPreenchido(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

// Um campo vazio gera um cartão sem título clicável ou um selo em branco;
// é melhor esconder o projeto e avisar no console do que publicar assim.
function projetoValido(projeto) {
  return linkValido(projeto.repositorio)
    && ["id", "nome", "resumo", "area"].every((campo) => textoPreenchido(projeto[campo]))
    && EXECUCOES.includes(projeto.execucao)
    && Object.hasOwn(ROTULO_DOCUMENTACAO, projeto.documentacao)
    && typeof projeto.publicado === "boolean";
}

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function criarSelo(texto, classeExtra) {
  return criar("li", classeExtra ? `selo ${classeExtra}` : "selo", texto);
}

function criarCartao(projeto) {
  const item = criar("li", "projeto");

  const titulo = criar("h2");
  const link = criar("a", null, projeto.nome);
  link.href = projeto.repositorio;
  link.rel = "noopener";
  titulo.append(link);

  const endereco = criar("p", "endereco", projeto.repositorio.replace("https://", ""));
  const resumo = criar("p", "resumo", projeto.resumo);

  const selos = criar("ul", "selos");
  selos.setAttribute("aria-label", "Classificação");
  selos.append(
    criarSelo(projeto.area),
    criarSelo(projeto.execucao),
    criarSelo(ROTULO_DOCUMENTACAO[projeto.documentacao] ?? "Documentação pendente",
      `selo-${projeto.documentacao}`),
  );
  if (!projeto.publicado) selos.append(criarSelo("Repositório em migração"));

  item.append(titulo, endereco, resumo, selos);

  if (projeto.documentacao === "completa") {
    const docs = criar("p", "links-docs");
    for (const [rotulo, caminho] of DOCUMENTOS) {
      const linkDoc = criar("a", null, rotulo);
      linkDoc.href = `${projeto.repositorio}/tree/main/${caminho}`;
      linkDoc.rel = "noopener";
      docs.append(linkDoc);
    }
    item.append(docs);
  }

  return item;
}

function filtrar() {
  // Cada palavra pode estar em qualquer ponto: "acao issqn" acha
  // "Ação fiscal" com "ISSQN" no resumo, mesmo sem as duas juntas.
  const palavras = normalizar(estado.busca).split(/\s+/).filter(Boolean);
  return projetos.filter((projeto) => {
    const naArea = estado.area === "Todas" || projeto.area === estado.area;
    const texto = normalizar(`${projeto.nome} ${projeto.resumo}`);
    return naArea && palavras.every((palavra) => texto.includes(palavra));
  });
}

function desenharLista() {
  const lista = document.getElementById("lista");
  const visiveis = filtrar();
  lista.replaceChildren(...visiveis.map(criarCartao));
  document.getElementById("vazio").hidden = visiveis.length > 0;
  document.getElementById("contagem").textContent =
    `${visiveis.length} de ${projetos.length} automações`;
}

function desenharAreas() {
  const grupo = document.getElementById("areas");
  const botoes = ["Todas", ...areas].map((area) => {
    const botao = criar("button", "area", area);
    botao.type = "button";
    botao.setAttribute("aria-pressed", String(area === estado.area));
    botao.addEventListener("click", () => {
      estado.area = area;
      desenharAreas();
      desenharLista();
    });
    return botao;
  });
  grupo.replaceChildren(...botoes);
}

function ordenar(lista, ordemAreas) {
  const posicao = (area) => {
    const indice = ordemAreas.indexOf(area);
    return indice === -1 ? ordemAreas.length : indice;
  };
  return lista.sort((a, b) =>
    posicao(a.area) - posicao(b.area) || a.nome.localeCompare(b.nome, "pt-BR"));
}

async function iniciar() {
  try {
    // no-cache: uma alteração no JSON aparece sem esperar o cache do Pages.
    const resposta = await fetch("projetos.json", { cache: "no-cache" });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();

    const descartados = dados.projetos.filter((p) => !projetoValido(p));
    if (descartados.length) {
      console.warn("Projetos com campo inválido foram ignorados:", descartados.map((p) => p.id));
    }

    // O id é o nome do repositório: dois iguais indicam uma entrada copiada
    // por engano. Fica a primeira, para a lista não mostrar duplicado.
    const idsVistos = new Set();
    const unicos = dados.projetos.filter(projetoValido).filter((p) => {
      if (idsVistos.has(p.id)) {
        console.warn("Projeto com id repetido foi ignorado:", p.id);
        return false;
      }
      idsVistos.add(p.id);
      return true;
    });

    // Uma área esquecida na lista "areas" ainda ganha botão de filtro;
    // sem isso o projeto só aparece em "Todas".
    const areasDosProjetos = unicos.map((p) => p.area);
    areas = [...new Set([...(dados.areas ?? []), ...areasDosProjetos])];
    projetos = ordenar(unicos, areas);

    if (dados.atualizado_em) {
      const [ano, mes, dia] = dados.atualizado_em.split("-");
      document.getElementById("atualizado").textContent = `Lista atualizada em ${dia}/${mes}/${ano}.`;
    }

    desenharAreas();
    desenharLista();
  } catch (erro) {
    console.error(erro);
    document.getElementById("erro").hidden = false;
  }
}

document.getElementById("busca").addEventListener("input", (evento) => {
  estado.busca = evento.target.value;
  desenharLista();
});

iniciar();
