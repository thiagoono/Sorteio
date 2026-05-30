import { renderCargos } from "./cargos.js";
import { renderNomes } from "./nomes.js";

const url = new URL(window.location.href)
let params = new URLSearchParams(url.search);

if (!params.has("lista")) {
  params.set("lista", "cargos")
}

export function renderPage() {
  if (params.get("lista") === "cargos") {
    renderCargos();
  } else {
    renderNomes();
  }
}

renderPage()