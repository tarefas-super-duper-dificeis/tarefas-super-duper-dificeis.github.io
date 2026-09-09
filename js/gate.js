var destravado = false;

window.addEventListener("DOMContentLoaded", function () {
  if (destravado) return;

  var div = document.createElement("div");
  div.id = "gate";

  var form = document.createElement("form");
  form.id = "gateform";

  var tit = document.createElement("div");
  tit.textContent = "sistema bloqueado";

  var input = document.createElement("input");
  input.id = "gatep";
  input.type = "password";
  input.autocomplete = "off";

  var btn = document.createElement("button");
  btn.textContent = "entrar";

  var err = document.createElement("div");
  err.id = "gaterr";
  err.textContent = "senha errada.";
  err.style.display = "none";

  form.appendChild(tit);
  form.appendChild(input);
  form.appendChild(btn);
  form.appendChild(err);
  div.appendChild(form);
  document.body.appendChild(div);

  function tentar() {
    if (senhaOk(input.value)) {
      destravado = true;
      document.body.removeChild(div);
    } else {
      err.style.display = "block";
      input.value = "";
      input.focus();
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    tentar();
  });

  input.focus();
});