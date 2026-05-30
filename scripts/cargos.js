import { renderNomes } from "./nomes.js";

export function renderCargos() {
  const cargos = JSON.parse(localStorage.getItem("cargos")) || [];

  document.body.innerHTML = `
    <main>
      <h1>Sorteio de Cargos</h1>

      <label for="cargos">Insira os cargos</label>
      <div class="form">
        <input type="text" name="cargos" id="cargos" />
        <button class="inserir botao" id="inserir-cargo">Inserir</button>
      </div>

      <div class="lista">
        <div class="itens"></div>
      </div>

      <div class="espacamento"></div>

      <button class="botao" id="confirmar">Confirmar Cargos</button>

      <div class="espacamento"></div>
    </main>

    <script src="scripts/index.js"></script>
  `

  if (cargos !== []) {
    renderListaCargos();
  }

  const cargo = document.getElementById("cargos");
  cargo.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      inserirCargo(cargo.value);
    }
  });

  const botaoCargo = document.getElementById("inserir-cargo");
  botaoCargo.addEventListener("click", () => {
    inserirCargo(cargo.value);
  });

  function inserirCargo(element) {
    if (element) {
      cargos.push(element);
    }

    cargo.value = "";

    localStorage.setItem("cargos", JSON.stringify(cargos));

    renderListaCargos();
  }

  function renderListaCargos() {
    let listaHTML = "";

    cargos.forEach((element, indice) => {
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
        cargos.splice(indice, 1);

        localStorage.setItem("cargos", JSON.stringify(cargos));

        renderListaCargos();
      });
    });
  }

  renderListaCargos();

  document.getElementById("confirmar").addEventListener("click", () => {
    if (cargos.length === 0) {
      alert("A lista de cargos está vazia!!");
    } else {
      renderNomes();
    }
  });
}