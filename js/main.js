var CATS = [
  ["todos","todos"],["acao","acao"],["corrida","corrida"],["esportes","esportes"],
  ["puzzle","puzzle"],["clicker","clicker"],["simulacao","simulacao"],
  ["estrategia","estrategia"],["plataforma","plataforma"],["tiro","tiro"],
  ["terror","terror"],["reto","retro"],["infinito","infinito"],
  ["cozinha","cozinha"],["musica","musica"],["educativo","educativo"]
];

var ativa = "todos";

function normal(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

function montarChips() {
  var h = "";
  for (var i = 0; i < CATS.length; i++) {
    h += '<button data-c="' + CATS[i][0] + '">' + CATS[i][1] + "</button>";
  }
  document.getElementById("chips").innerHTML = h;
}

function filtrar() {
  var q = normal(document.getElementById("busca").value);
  var lista = document.getElementById("lista");
  var h = "", cont = 0;
  for (var i = 0; i < GAMES.length; i++) {
    var g = GAMES[i];
    if (ativa !== "todos" && g[2].indexOf(ativa) === -1) continue;
    if (q && normal(g[0] + " " + g[1] + " " + g[2].join(" ")).indexOf(q) === -1) continue;
    h += "<li><a href=\"" + g[0] + "/\" data-slug=\"" + g[0] + "\">" + g[1] + "</a></li>";
    cont++;
  }
  lista.innerHTML = h;
  document.getElementById("nada").style.display = cont ? "none" : "block";
  document.getElementById("total").textContent = " (" + cont + ")";
}

function abrirAba(slug) {
  var u = new URL(slug + "/", location.href).href;
  var win = null;
  try { win = window.open("about:blank", "_blank"); } catch (e) {}
  if (!win) { location.href = u; return; }
  win.document.title = "New Tab";
  win.document.body.style.margin = "0";
  win.document.body.style.overflow = "hidden";
  var f = win.document.createElement("iframe");
  f.src = u;
  f.style.border = "0";
  f.style.width = "100%";
  f.style.height = "100%";
  win.document.body.appendChild(f);
}

var camuflado = false;
var tituloOriginal = document.title;
function camuflar() {
  camuflado = !camuflado;
  if (camuflado) {
    document.title = "Novo documento";
    var l = document.createElement("link");
    l.rel = "icon";
    l.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='15' font-size='14'>&#128394;</text></svg>";
    document.head.appendChild(l);
    document.getElementById("camuflar").textContent = "descamuflar";
  } else {
    document.title = tituloOriginal;
    var links = document.querySelectorAll('link[rel="icon"]');
    for (var i = 0; i < links.length; i++) links[i].remove();
    document.getElementById("camuflar").textContent = "camuflar";
  }
}

function montar() {
  montarChips();
  filtrar();

  var chips = document.querySelectorAll("#chips button");
  for (var i = 0; i < chips.length; i++) {
    chips[i].addEventListener("click", function () {
      ativa = this.getAttribute("data-c");
      var b = document.querySelectorAll("#chips button");
      for (var j = 0; j < b.length; j++) b[j].className = b[j].getAttribute("data-c") === ativa ? "on" : "";
      filtrar();
    });
  }

  document.getElementById("busca").addEventListener("input", filtrar);

  document.getElementById("lista").addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[data-slug]") : null;
    if (a) { e.preventDefault(); abrirAba(a.getAttribute("data-slug")); }
  });

  document.getElementById("camuflar").addEventListener("click", function (e) {
    e.preventDefault();
    camuflar();
  });

  document.getElementById("panic").addEventListener("click", function (e) {
    e.preventDefault();
    location.replace("https://www.google.com");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "`") { e.preventDefault(); location.replace("https://www.google.com"); }
  });
}

window.addEventListener("DOMContentLoaded", montar);
