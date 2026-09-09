var SENHA = "am9nb3MwMjEz";

function senhaOk(s) {
  try {
    return btoa(s) === SENHA;
  } catch (e) {
    return false;
  }
}