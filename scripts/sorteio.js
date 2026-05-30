const cargos = JSON.parse(localStorage.getItem("cargos")) || [];
const nomes = JSON.parse(localStorage.getItem("nomes")) || [];

if (cargos !== []) {
  renderTabela();
  renderNomesRestantes();
}

function renderTabela() {
  const tabela = document.getElementById("tabela");

  let tabelaHTML = `
    <tr>
      <th>Cargos</th>
      <th>Nome</th>
    </tr>
  `;

  let i = 0;
  cargos.forEach((cargo) => {
    i++;

    tabelaHTML += `
      <tr onclick="selecionarCargo(${i})" id="linha-${i}">
        <td>${cargo}</td>
        <td id="${i}"></td>
      </tr>
    `;

    tabela.innerHTML = tabelaHTML;
  });
}

function renderNomesRestantes() {
  let nomesRestantesHTML = "";
  nomes.forEach((nome) => {
    nomesRestantesHTML += `
      <p>${nome}</p>
    `;
  });
  document.getElementById("nomes-restantes").innerHTML = nomesRestantesHTML;
}

const sorteador = document.getElementById("sorteador");

let intervaloID;
sorteador.addEventListener("click", () => {
  clearInterval(intervaloID)
  function sortear(tempo, contagem) {
    console.log(tempo, contagem)
    let contador = 0;
    let numeroAleatorio;
    let nomeAleatorio;

    intervaloID = setInterval(() => {
      numeroAleatorio = Math.floor(Math.random() * nomes.length);
      nomeAleatorio = nomes[numeroAleatorio];

      document.getElementById("display-do-sorteio").innerText = nomeAleatorio

      if (contagem <= 0) {
        inserirNome(nomeAleatorio, numeroAleatorio)
        clearInterval(intervaloID)
        
        return;
      }

      contador++

      if (contador === contagem) { 
        if (tempo >= 540) {
          clearInterval(intervaloID)
          tempo += 300
          contagem -= 1
          sortear(tempo, contagem)
        } else if (tempo >= 390) {
          clearInterval(intervaloID)
          tempo += 150
          contagem -= 1
          sortear(tempo, contagem)
        } else if (tempo >= 200) {
          clearInterval(intervaloID)
          tempo += 80
          contagem -= 1
          sortear(tempo, contagem)
        } else if (tempo >= 100) {
          clearInterval(intervaloID)
          tempo += 40
          contagem -= 1
          sortear(tempo, contagem)
        } else {
          clearInterval(intervaloID)
          tempo += 20
          contagem -= 1
          sortear(tempo, contagem)
        }
      }
    }, tempo)
  }

  sortear(50, 10)
});

function inserirNome(nomeSorteado, numeroAleatorio) {
  nomes.splice(numeroAleatorio, 1)
  renderNomesRestantes()
  localStorage.setItem("nomes", JSON.stringify(nomes))

  document.getElementById(cargoSelecionado).innerText = nomeSorteado;
  
  document.getElementById(`linha-${cargoSelecionado}`).classList.remove("selecionado")
  document.getElementById(`linha-${cargoSelecionado}`).classList.add("escolhido")
}

let cargoSelecionado;
function selecionarCargo(cargo) {
  if (document.getElementById(`linha-${cargo}`).classList.contains("escolhido")) {
    return
  }

  if (cargoSelecionado) {
    document
      .getElementById(`linha-${cargoSelecionado}`)
      .classList.remove("selecionado");
  }

  cargoSelecionado = cargo;

  document.getElementById(`linha-${cargo}`).classList.add("selecionado");
}

document.getElementById("voltar-para-nomes")
  .addEventListener("click", () => {
    window.location.href = "index.html?lista=nomes"
  })

selecionarCargo(1)