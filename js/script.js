const display = document.querySelector("#display");
const teclasNumericas = document.querySelectorAll(".num");
const teclasOperacoes = document.querySelectorAll(".operacao");
const teclasParenteses = document.querySelectorAll(".parentese");
const calcular = document.querySelector(".calcular");
const limpar = document.querySelectorAll(".limpar");
const decimal = document.querySelector(".decimal");

function inserirNoDisplay(botao) {
  if (display.textContent == "0" || display.textContent == "Erro") {
    display.textContent = "";
    display.textContent += botao.textContent;
  } else {
    display.textContent += botao.textContent;
  }
}

function formatarSeparador(operacao) {
  return operacao.replaceAll(",", ".");
}

function formatarOperacao(resultado) {
  let valores = resultado.split(/(\+|\-|\×|\÷|\√|\π|\^)/);
  console.log(valores);
  for (let i = 0; i < valores.length; i++) {
    index = valores.indexOf(valores[i]);

    if (valores[i] == "×") {
      valores[i] = "*";
    } else if (valores[i] == "÷") {
      valores[i] = "/";
    } else if (valores[i] == "^") {
      valores[i] = `**`;
    } else if (valores[i] == "√") {
      valores[i] = `Math.sqrt(${valores[i + 1]})`;
      valores.splice(index + 1, 1);
    } else if (valores[i] == "π") {
      valores[i] = `*Math.PI`;
    } else if (/\d%/.test(valores[i])) {
      let valor = valores[i].replace("%", "");
      valores[i] = `${valores[i - 2]}*(${valor}/100)`;
    } else if (/\d\(\d/g.test(valores[i])) {
      valores[i] = valores[i].replace("(", "*(")
    } else if (/\d\)\d/g.test(valores[i])) {
      valores[i] = valores[i].replace(")", ")*");
    }
  }

  console.log(valores);
  return valores.join("");
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

  if (display.textContent == "Erro") {
    return;
  }

  display.textContent += event.target.textContent;
});

teclasOperacoes.forEach((operacao) => {
  operacao.addEventListener("click", (event) => {
    if (
      event.target.textContent != "-" &&
      display.textContent == "0" &&
      event.target.textContent != "π" &&
      event.target.textContent != "√"
    ) {
      return;
    }

    let regex = /[+\-×÷√π%^]$/g;

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
      if(display.textContent == "Erro") {
        display.textContent = "0";
      }

      display.textContent = display.textContent.slice(0, -1);

      if (!display.textContent) {
        display.textContent = "0";
      }
    }
  });
});

calcular.addEventListener("click", () => {
  try {
    let operacao = formatarSeparador(display.textContent);
    operacao = formatarOperacao(operacao);
    console.log(operacao);
    let resultado = eval(operacao);
    display.textContent = resultado.toLocaleString("pt-BR");
  } catch (error) {
    display.textContent = "Erro";
  }
});
