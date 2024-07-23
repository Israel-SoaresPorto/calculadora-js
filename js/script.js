const display = document.querySelector("#display");
const teclasNumericas = document.querySelectorAll(".num");
const teclasOperacoes = document.querySelectorAll(".operacao");
const teclasParenteses = document.querySelectorAll(".parentese");
const calcular = document.querySelector(".calcular");
const limpar = document.querySelectorAll(".limpar");
const decimal = document.querySelector(".decimal");

function inserirNoDisplay(botao) {
  if (display.textContent == "0") {
    display.textContent = "";
    display.textContent += botao.textContent;
  } else {
    display.textContent += botao.textContent;
  }
}

function formatarOperacao(operacao) {
  return operacao.replaceAll(',', '.');
}

teclasNumericas.forEach((numero) => {
  numero.addEventListener("click", (event) => {
    inserirNoDisplay(event.target);
  });
});

decimal.addEventListener("click", (event) => {
  let liberarDecimal = true;

  let temDecimalAposDigito = /\d,$/.test(display.textContent);
  let jaTemNumeroDecimal = /\d,\d{1,}$/.test(display.textContent);
  let temSinal = /[+\-*/]$/.test(display.textContent);
  let verificacaoParaLiberarDecimal = /\d[+\-*\/]\d$/.test(display.textContent);

  if (jaTemNumeroDecimal || temDecimalAposDigito || temSinal) {
    liberarDecimal = false;
  }

  if (verificacaoParaLiberarDecimal) {
    liberarDecimal = true;
  }

  if (!liberarDecimal) {
    return;
  }

  display.textContent += event.target.textContent;
});

teclasOperacoes.forEach((operacao) => {
  operacao.addEventListener("click", (event) => {
    if (event.target.textContent != "-" && display.textContent == "0") {
      return;
    }

    let regex = /[+\-*/]$/;

    if (regex.test(display.textContent)) {
      return;
    }

    inserirNoDisplay(event.target);
  });
});

teclasParenteses.forEach((parentese) => {
  parentese.addEventListener("click", (event) => {
    inserirNoDisplay(event.target);
  });
});

limpar.forEach((limpa) => {
  limpa.addEventListener("click", (event) => {
    if (event.target.textContent == "AC") {
      display.textContent = "0";
    } else {
      display.textContent = display.textContent.slice(0, -1);

      if (!display.textContent) {
        display.textContent = "0";
      }
    }
  });
});

calcular.addEventListener('click', () => {
    let operacao = formatarOperacao(display.textContent);
    let resultado = eval(operacao);
    display.textContent = resultado;
});
