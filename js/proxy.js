function arrumarUrl(txt) {
  txt = txt.trim();
  if (!txt) return null;
  if (txt.indexOf(" ") === -1 && txt.indexOf(".") !== -1 && txt.indexOf("://") === -1) {
    txt = "https://" + txt;
  }
  var val = /^(https?:\/\/)?([a-z\d\-\.]+\.)+[a-z]{2,}([:/?#].*)?$/i.test(txt);
  if (!val) return null;
  return txt;
}

function montarUrl(url, modo) {
  if (modo === "translate") {
    return "https://translate.google.com/translate?sl=auto&tl=pt&u=" + encodeURIComponent(url);
  }
  if (modo === "cors") {
    return "https://corsproxy.io/?" + encodeURIComponent(url);
  }
  return url;
}

function abrir(url, modo, alvo) {
  var f = montarUrl(url, modo);
  if (alvo === "iframe") {
    var w = document.getElementById("proxywrap");
    w.style.display = "block";
    document.getElementById("pframe").src = f;
  } else {
    var win = null;
    try { win = window.open("about:blank", "_blank"); } catch (e) {}
    if (!win) { location.href = f; return; }
    win.document.title = "New Tab";
    win.document.body.style.margin = "0";
    win.document.body.style.overflow = "hidden";
    var i = win.document.createElement("iframe");
    i.src = f;
    i.style.border = "0";
    i.style.width = "100%";
    i.style.height = "100%";
    win.document.body.appendChild(i);
  }
}

var QUICK = [
  ["Google","https://www.google.com"],
  ["YouTube","https://www.youtube.com"],
  ["Wikipedia","https://pt.wikipedia.org"],
  ["Google Tradutor","https://translate.google.com"],
  ["Classroom","https://classroom.google.com"],
  ["Google Maps","https://www.google.com/maps"],
  ["DuckDuckGo","https://duckduckgo.com"]
];

function montarFatias() {
  var h = "";
  for (var i = 0; i < QUICK.length; i++) {
    h += '<button data-u="' + QUICK[i][1] + '">' + QUICK[i][0] + "</button>";
  }
  document.getElementById("fatias").innerHTML = h;
}

function montar() {
  montarFatias();

  document.getElementById("pf").addEventListener("submit", function (e) {
    e.preventDefault();
    var u = arrumarUrl(document.getElementById("purl").value);
    if (!u) return;
    abrir(u, document.getElementById("pmode").value, "iframe");
  });

  document.getElementById("pblank").addEventListener("click", function () {
    var u = arrumarUrl(document.getElementById("purl").value);
    if (!u) return;
    abrir(u, document.getElementById("pmode").value, "aba");
  });

  document.getElementById("fatias").addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button[data-u]") : null;
    if (b) abrir(b.getAttribute("data-u"), document.getElementById("pmode").value, "iframe");
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
