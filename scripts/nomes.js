import { renderPage } from "./index.js"

export function renderNomes() {
  document.body.innerHTML = `
    <main>
      <h1>Sorteio de Cargos</h1>

      <label for="nomes">Insira os nomes</label>
      <div class="form">
        <input type="text" name="nomes" id="nomes" />
        <button class="inserir botao" id="inserir-nome">Inserir</button>
      </div>

      <div class="lista">
        <div class="itens"></div>
      </div>

      <div class="espacamento"></div>

      <button class="botao" id="confirmar">Confirmar Nomes</button>

      <button class="botao-voltar" id="voltar-para-cargos">
       <img src="./images/voltar.png" height="50px" width="50px">
      </button>

      <div class="espacamento"></div>
    </main>

    <script src="scripts/index.js"></script>
  `;

  const nomes = JSON.parse(localStorage.getItem("nomes")) || [];

  if (nomes !== []) {
    renderListaNomes();
  }

  const nome = document.getElementById("nomes");
  nome.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inserirNome(nome.value);
    }
  });

  const botaoNome = document.getElementById("inserir-nome");
  botaoNome.addEventListener("click", () => {
    inserirNome(nome.value);
  });

  function inserirNome(element) {
    if (element) {
      nomes.push(element);
    }

    nome.value = "";

    localStorage.setItem("nomes", JSON.stringify(nomes));

    renderListaNomes();
  }

  function renderListaNomes() {
    let listaHTML = "";

    nomes.forEach((element, indice) => {
      listaHTML += `
      <p class="item-lista" id="${indice}">
        ${element} <span class="remove-button" data-indice="${indice}">X</span
      ></p>
    `;
    });

    document.querySelector(".itens").innerHTML = listaHTML;

    document.querySelectorAll(".remove-button").forEach((item) => {
      item.addEventListener("click", () => {
        const { indice } = item.dataset;
        nomes.splice(indice, 1);

        localStorage.setItem("nomes", JSON.stringify(nomes));

        renderListaNomes();
      });
    });
  }

  renderListaNomes();

  document.getElementById("confirmar").addEventListener("click", () => {
    if (nomes.length === 0) {
      alert("A lista de nomes está vazia!!");
    } else {
      window.location.href = "sorteio.html";
    }
  })

  document.getElementById("voltar-para-cargos")
    .addEventListener("click", () => {
      const url = new URL(window.location.href)
      let params = new URLSearchParams(url.search);
      params.set("lista", "cargos")
      renderPage();
    })
}
