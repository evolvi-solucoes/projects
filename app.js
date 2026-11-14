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

const estado = { busca: "", area: "Todas", situacao: "Todas", hosts: new Set() };
let projetos = [];
let areas = [];

const EXECUCOES = ["Serviço", "Tarefa agendada", "Manual", "A definir"];

// Onde a automação roda. O ícone é o arquivo assets/hosts/<chave>.svg.
const HOSTS = {
  make: "Make",
  notion: "Notion",
  cloudflare: "Cloudflare",
  servidor: "Servidor",
  supabase: "Supabase",
  local: "Local",
};

const ROTULO_SITUACAO = {
  andamento: "Em andamento",
  producao: "Em produção",
  pausado: "Pausado",
  desativado: "Desativado",
};

// Datas são opcionais; quando existem, precisam ser AAAA-MM-DD reais,
// porque integrações futuras vão ler esses campos do JSON público.
function dataValida(valor) {
  if (valor === undefined) return true;
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;
  const data = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(data.getTime()) && data.toISOString().startsWith(valor);
}

function formatarData(valor) {
  const [ano, mes, dia] = valor.split("-");
  return `${dia}/${mes}/${ano}`;
}

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
    && Object.hasOwn(ROTULO_SITUACAO, projeto.situacao)
    && typeof projeto.publicado === "boolean"
    && hostsValidos(projeto.roda_em)
    && horasValidas(projeto.horas_mes)
    && dataValida(projeto.iniciado_em)
    && dataValida(projeto.atualizado_em);
}

// Opcionais: uma chave de host fora de HOSTS não teria ícone nem filtro.
function hostsValidos(valor) {
  return valor === undefined
    || (Array.isArray(valor) && valor.every((h) => Object.hasOwn(HOSTS, h)));
}

// Horas economizadas por mês; null significa "ainda não medido".
function horasValidas(valor) {
  return valor === undefined || valor === null
    || (typeof valor === "number" && Number.isFinite(valor) && valor >= 0);
}

function criarIconeHost(chave) {
  const icone = criar("span", `host-icone host-${chave}`);
  icone.style.setProperty("--icone", `url("assets/hosts/${chave}.svg")`);
  icone.setAttribute("aria-hidden", "true");
  return icone;
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
    criarSelo(ROTULO_SITUACAO[projeto.situacao], `selo-situacao-${projeto.situacao}`),
    criarSelo(projeto.area),
    criarSelo(projeto.execucao),
    criarSelo(ROTULO_DOCUMENTACAO[projeto.documentacao] ?? "Documentação pendente",
      `selo-${projeto.documentacao}`),
  );
  if (!projeto.publicado) selos.append(criarSelo("Repositório em migração"));

  item.append(titulo, endereco, resumo, selos);

  const hosts = projeto.roda_em ?? [];
  if (hosts.length) {
    const roda = criar("p", "roda-em");
    roda.append(criar("span", "roda-em-rotulo", "Roda em"));
    for (const chave of hosts) {
      const host = criar("span", "host");
      host.append(criarIconeHost(chave), criar("span", null, HOSTS[chave]));
      roda.append(host);
    }
    item.append(roda);
  }

  const datas = [];
  if (projeto.iniciado_em) datas.push(`Iniciado em ${formatarData(projeto.iniciado_em)}`);
  if (projeto.atualizado_em) datas.push(`Atualizado em ${formatarData(projeto.atualizado_em)}`);
  if (datas.length) item.append(criar("p", "datas", datas.join(" · ")));

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
    const naSituacao = estado.situacao === "Todas" || projeto.situacao === estado.situacao;
    const texto = normalizar(`${projeto.nome} ${projeto.resumo}`);
    const noHost = estado.hosts.size === 0
      || (projeto.roda_em ?? []).some((h) => estado.hosts.has(h));
    return naArea && naSituacao && noHost && palavras.every((palavra) => texto.includes(palavra));
  });
}

function desenharLista() {
  const lista = document.getElementById("lista");
  const visiveis = filtrar();
  lista.replaceChildren(...visiveis.map(criarCartao));
  document.getElementById("vazio").hidden = visiveis.length > 0;
  document.getElementById("contagem").textContent =
    `${visiveis.length} de ${projetos.length} projetos`;
}

// Soma só o que foi medido; sem nenhum valor no JSON mostra "—".
function formatarHoras(lista) {
  const medidos = lista.map((p) => p.horas_mes).filter((h) => typeof h === "number");
  if (!medidos.length) return "—";
  const total = medidos.reduce((a, b) => a + b, 0);
  return `${total.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} h`;
}

// Números do portfólio inteiro, não da busca: não mudam ao filtrar.
function desenharEstatisticas() {
  const total = projetos.length;
  const emProducao = projetos.filter((p) => p.situacao === "producao").length;
  const completas = projetos.filter((p) => p.documentacao === "completa").length;
  const pct = total ? Math.round((completas / total) * 100) : 0;
  const itens = [
    [total, "automações no portfólio"],
    [emProducao, "em produção"],
    [`${pct}%`, "com documentação completa"],
    [areas.length, "áreas atendidas"],
    [formatarHoras(projetos), "economizadas por mês"],
  ];
  document.getElementById("estatisticas").replaceChildren(...itens.map(([valor, rotulo]) => {
    const bloco = criar("div", "estatistica");
    const rotuloEl = criar("dt", null, rotulo);
    const valorEl = criar("dd", null, String(valor));
    bloco.append(valorEl, rotuloEl);
    return bloco;
  }));
}

// Pill com lista suspensa. Em modo múltiplo (hosts) as opções são caixas
// de seleção e a lista fica aberta; no simples, escolher fecha a lista.
let pillAberta = null;

function fecharPills() {
  if (!pillAberta) return;
  pillAberta.classList.remove("aberta");
  pillAberta.querySelector(".pill").setAttribute("aria-expanded", "false");
  pillAberta = null;
}

function criarPill({ titulo, opcoes, multiplo, valorAtual, aoMudar }) {
  const raiz = criar("div", "pill-raiz");
  const botao = criar("button", "pill");
  botao.type = "button";
  botao.setAttribute("aria-haspopup", "listbox");
  botao.setAttribute("aria-expanded", "false");

  const rotuloAtual = () => {
    const sel = multiplo ? [...valorAtual()] : valorAtual() === "Todas" ? [] : [valorAtual()];
    if (!sel.length) return null;
    const nomes = sel.map((v) => opcoes.find((o) => o.valor === v)?.rotulo ?? v);
    return nomes.length > 2 ? `${nomes.length} selecionados` : nomes.join(", ");
  };

  const lista = criar("ul", "pill-lista");
  lista.setAttribute("role", "listbox");
  lista.setAttribute("aria-label", titulo);
  if (multiplo) lista.setAttribute("aria-multiselectable", "true");

  const atualizar = () => {
    const atual = rotuloAtual();
    botao.replaceChildren(criar("span", "pill-titulo", titulo));
    if (atual) botao.append(criar("span", "pill-valor", atual));
    botao.append(criar("span", "pill-seta"));
    botao.classList.toggle("ativa", Boolean(atual));
    for (const li of lista.children) {
      const marcada = multiplo
        ? valorAtual().has(li.dataset.valor)
        : valorAtual() === li.dataset.valor;
      li.setAttribute("aria-selected", String(marcada));
    }
  };

  for (const opcao of opcoes) {
    const li = criar("li", "pill-opcao");
    li.setAttribute("role", "option");
    li.tabIndex = 0;
    li.dataset.valor = opcao.valor;
    li.append(criar("span", "pill-marca"));
    if (opcao.icone) li.append(criarIconeHost(opcao.icone));
    li.append(criar("span", null, opcao.rotulo));
    const escolher = () => {
      aoMudar(opcao.valor);
      atualizar();
      desenharLista();
      if (!multiplo) { fecharPills(); botao.focus(); }
    };
    li.addEventListener("click", escolher);
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); escolher(); }
    });
    lista.append(li);
  }

  botao.addEventListener("click", (e) => {
    e.stopPropagation();
    const abrir = pillAberta !== raiz;
    fecharPills();
    if (abrir) {
      raiz.classList.add("aberta");
      botao.setAttribute("aria-expanded", "true");
      pillAberta = raiz;
    }
  });
  lista.addEventListener("click", (e) => e.stopPropagation());

  raiz.append(botao, lista);
  atualizar();
  return raiz;
}

document.addEventListener("click", fecharPills);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharPills(); });

function desenharPills() {
  const situacoes = Object.keys(ROTULO_SITUACAO)
    .filter((chave) => projetos.some((p) => p.situacao === chave));
  const hostsUsados = Object.keys(HOSTS)
    .filter((chave) => projetos.some((p) => (p.roda_em ?? []).includes(chave)));

  document.getElementById("pills").replaceChildren(
    criarPill({
      titulo: "Situação",
      opcoes: [{ valor: "Todas", rotulo: "Todas" },
        ...situacoes.map((c) => ({ valor: c, rotulo: ROTULO_SITUACAO[c] }))],
      valorAtual: () => estado.situacao,
      aoMudar: (v) => { estado.situacao = v; },
    }),
    criarPill({
      titulo: "Área",
      opcoes: [{ valor: "Todas", rotulo: "Todas" },
        ...areas.map((a) => ({ valor: a, rotulo: a }))],
      valorAtual: () => estado.area,
      aoMudar: (v) => { estado.area = v; },
    }),
    criarPill({
      titulo: "Roda em",
      multiplo: true,
      opcoes: hostsUsados.map((c) => ({ valor: c, rotulo: HOSTS[c], icone: c })),
      valorAtual: () => estado.hosts,
      aoMudar: (v) => {
        if (estado.hosts.has(v)) estado.hosts.delete(v); else estado.hosts.add(v);
      },
    }),
  );
}

function ordenar(lista) {
  return lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
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
    projetos = ordenar(unicos);

    if (dados.atualizado_em) {
      const [ano, mes, dia] = dados.atualizado_em.split("-");
      document.getElementById("atualizado").textContent = `Lista atualizada em ${dia}/${mes}/${ano}.`;
    }

    desenharEstatisticas();
    desenharPills();
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
