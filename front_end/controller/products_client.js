// Containers das telas:
let mainClientContainer = document.getElementById("elementsContainer");
let mainCartContainer = document.getElementById("elementsContainerCart");
let productsContainer = document.getElementById("productsContainer");
let filterContainer = document.getElementById("filterContainer");
let cartContainer = document.getElementById("cartContainer");
// Botões das telas
let btnAdd = document.getElementById("btnAdd");
let btnCadastro = document.getElementById("btnCadastrar");
let btnCancelar = document.getElementById("btnCancelar");
let btnFecharPedido = document.getElementById("fecharPedidoBtn");
let az = document.getElementById("az");
let escolher = document.getElementById("escolher");
// Itens do Menu Lateral
let todos = document.getElementById("todos");
let pizza = document.getElementById("pizza");
let sobremesa = document.getElementById("sobremesa");
let lanche = document.getElementById("lanche");
let acai = document.getElementById("acai");
let bebidas = document.getElementById("bebidas");
// Parametro que será usado na função que cria os cards
let card = "todos";
// Array de produtos
let produtos = [];
// Array dos produtos que vão para a tela de carrinho
let cart = [];
let precosProdArray = [];
// Elementos do total os produtos
let textCart = document.getElementById("textCart");
let paymentTable = document.getElementById("paymentTable");
let subtotal = document.getElementById("subtotal");
let totalCampo = document.getElementById("total");
let discountPaymentContainer = document.getElementById(
  "discountPaymentContainer"
);
let discountInput = document.getElementById("discountInput");
// Variaveis para calculos do preço a ser pago
let valorTotal = 0;
let valorFinal = 0;
let valorDesconto = 0;
let valorFinalDescontado = 0;

// Classe produto
class Produto {
  constructor(nomeProd, categoria, descricao, valor, file) {
    (this.nomeProd = nomeProd),
      (this.categoria = categoria),
      (this.descricao = descricao),
      (this.valor = valor),
      (this.file = file);
  }

  //função que verifica se os dados estão devidamente preenchidos
  validarDados() {
    for (let i in this) {
      console.log(this[i]);
      if (this[i] === undefined || this[i] === null || this[i] === "") {
        return false;
      }
    }
    return true;
  }
}

// Classe que simula o Banco de dados
class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      // Se não existir nenhum id, o valor recebe 0
      localStorage.setItem("id", 0);
    }
  }

  // Função que recupera o proximo id em sequencia do anterior.
  getProximoId() {
    let proximoId = localStorage.getItem("id");

    return parseInt(proximoId) + 1;
  }

  // função que grava o produto no LocalStorage
  gravar(produto) {
    let id = this.getProximoId();
    localStorage.setItem("id", id);
    localStorage.setItem(id, JSON.stringify(produto));
  }

  recuperarTodosRegistros() {
    let id = localStorage.getItem("id");
    // Array de produtos
    let produtosArray = [];
    // recupera todas os produtos cadastradas em localstorage
    for (let i = 1; i <= id; i++) {
      let produto = JSON.parse(localStorage.getItem(i));
      // se o produto tiver sido removido, ele pula esse produto
      if (produto === null) {
        continue;
      }
      produtosArray.push(produto);
    }

    return produtosArray;
  }
}

// Uso da classe BD
let bd = new Bd();

// Recebe o retorno do array de produtos
produtos = bd.recuperarTodosRegistros();

// Funções de alteração nos botoes do menu
document.querySelectorAll(".todos").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "todos";
    carregaListaProdutos(card);
    todos.classList.add("active");
    pizza.classList.remove("active");
    sobremesa.classList.remove("active");
    lanche.classList.remove("active");
    acai.classList.remove("active");
    bebidas.classList.remove("active");
    fecharTelaCarrinho();
  })
);

document.querySelectorAll(".pizza").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "pizza";
    carregaListaProdutos(card);
    elemento.classList.add("active");
    todos.classList.remove("active");
    sobremesa.classList.remove("active");
    lanche.classList.remove("active");
    acai.classList.remove("active");
    bebidas.classList.remove("active");
    fecharTelaCarrinho();
  })
);

document.querySelectorAll(".sobremesa").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "sobremesa";
    carregaListaProdutos(card);
    elemento.classList.add("active");
    todos.classList.remove("active");
    pizza.classList.remove("active");
    lanche.classList.remove("active");
    acai.classList.remove("active");
    bebidas.classList.remove("active");
    fecharTelaCarrinho();
  })
);

document.querySelectorAll(".lanche").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "lanche";
    carregaListaProdutos(card);
    elemento.classList.add("active");
    todos.classList.remove("active");
    pizza.classList.remove("active");
    sobremesa.classList.remove("active");
    acai.classList.remove("active");
    bebidas.classList.remove("active");
    fecharTelaCarrinho();
  })
);

document.querySelectorAll(".acai").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "acai";
    carregaListaProdutos(card);
    elemento.classList.add("active");
    todos.classList.remove("active");
    pizza.classList.remove("active");
    sobremesa.classList.remove("active");
    lanche.classList.remove("active");
    bebidas.classList.remove("active");
    fecharTelaCarrinho();
  })
);

document.querySelectorAll(".bebidas").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "bebidas";
    carregaListaProdutos(card);
    elemento.classList.add("active");
    todos.classList.remove("active");
    pizza.classList.remove("active");
    sobremesa.classList.remove("active");
    lanche.classList.remove("active");
    acai.classList.remove("active");
    fecharTelaCarrinho();
  })
);

az.addEventListener("click", function (e) {
  e.preventDefault();
  ordenaProdutos();
});

document.querySelectorAll(".escolher").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    valorFinal = 0;
    subtotal.innerHTML = `R$ ${valorFinal.toFixed(2)}`;
    totalCampo.innerHTML = `R$ ${valorFinal.toFixed(2)}`;
    for (let i = 0; i < precosProdArray.length; i++) {
      precosProdArray[i] = 0;
    }
    fecharTelaCarrinho();
  })
);

btnFecharPedido.addEventListener("click", function () {
  if (valorFinal != 0) {
    alert("Pedido Realizado!");
    paginaMainClient();
  } else {
    alert("Selecione a quantidade dos produtos que deseja comprar");
  }
});

// exibe os produtos cadastrados na tela
function carregaListaProdutos(categoria) {
  // Limpando a exibição dos produtos
  productsContainer.innerHTML = "";
  for (let i = 0; i < produtos.length; i++) {
    // Elementos do card
    // Containers
    let card = document.createElement("div");
    let productImageTitle = document.createElement("div");
    let priceContainer = document.createElement("div");
    let titleDescriptionContainer = document.createElement("div");
    // Elementos
    let productImg = document.createElement("img");
    let cardTitle = document.createElement("h3");
    let cardDescription = document.createElement("p");
    let productPrice = document.createElement("p");
    let buttonComprar = document.createElement("button");
    // Adicionando classes aos elementos
    card.classList.add("card");
    productImageTitle.classList.add("productImageTitle");
    priceContainer.classList.add("priceContainer");
    productImg.classList.add("productImg");
    titleDescriptionContainer.classList.add("titleDescriptionContainer");
    cardTitle.classList.add("cardTitle");
    cardDescription.classList.add("cardDescription");
    productPrice.classList.add("price");
    buttonComprar.classList.add("btn");
    buttonComprar.classList.add("btnPurchase");
    // Adicionando conteudo nos elementos
    var title = document.createTextNode(produtos[i].nomeProd);
    var description = document.createTextNode(produtos[i].descricao);
    var price = document.createTextNode(
      "R$ " + parseFloat(produtos[i].valor).toFixed(2)
    );
    var buttonText = document.createTextNode("Comprar");
    productImg.src = "../assets/images/" + produtos[i].file.substring(12);
    cardTitle.appendChild(title);
    cardDescription.appendChild(description);
    productPrice.appendChild(price);
    buttonComprar.appendChild(buttonText);
    // Adicionando elementos no card
    titleDescriptionContainer.appendChild(cardTitle);
    titleDescriptionContainer.appendChild(cardDescription);
    productImageTitle.appendChild(productImg);
    productImageTitle.appendChild(titleDescriptionContainer);
    priceContainer.appendChild(productPrice);
    priceContainer.appendChild(buttonComprar);
    card.appendChild(productImageTitle);
    card.appendChild(priceContainer);

    // Função que adiciona os produtos no carrinho
    buttonComprar.addEventListener("click", function (e) {
      let compraObj = {
        file: "../assets/images/" + produtos[i].file.substring(12),
        nomeProd: produtos[i].nomeProd,
        descricao: produtos[i].descricao,
        valor: produtos[i].valor,
        categoria: produtos[i].categoria,
      };

      cart.push(compraObj);
      adicionaProdutoNoCarrinho(cart);
      alert("Produto Adicionado no Carrinho");
    });

    if (produtos[i].categoria == categoria) {
      productsContainer.appendChild(card);
    } else if (categoria == "todos") {
      productsContainer.appendChild(card);
    }
  }
}

// Ordena os produtos em ordem alfabética
function ordenaProdutos() {
  produtos.sort(function (a, b) {
    if (a.nomeProd < b.nomeProd) return -1;
    if (a.nomeProd > b.nomeProd) return 1;
    return 0;
  });
  carregaListaProdutos(card);
}

// Cria os card filtrados por seu preço
function filtraProdutos(n1, n2) {
  productsContainer.innerHTML = "";

  for (let i = 0; i < produtos.length; i++) {
    // Elementos do card
    // Containers
    let card = document.createElement("div");
    let productImageTitle = document.createElement("div");
    let priceContainer = document.createElement("div");
    let titleDescriptionContainer = document.createElement("div");
    // Elementos
    let productImg = document.createElement("img");
    let cardTitle = document.createElement("h3");
    let cardDescription = document.createElement("p");
    let productPrice = document.createElement("p");
    let buttonComprar = document.createElement("button");
    // Adicionando classes aos elementos
    card.classList.add("card");
    productImageTitle.classList.add("productImageTitle");
    priceContainer.classList.add("priceContainer");
    productImg.classList.add("productImg");
    titleDescriptionContainer.classList.add("titleDescriptionContainer");
    cardTitle.classList.add("cardTitle");
    cardDescription.classList.add("cardDescription");
    productPrice.classList.add("price");
    buttonComprar.classList.add("btn");
    buttonComprar.classList.add("btnPurchase");
    // Adicionando conteudo nos elementos
    var title = document.createTextNode(produtos[i].nomeProd);
    var description = document.createTextNode(produtos[i].descricao);
    var price = document.createTextNode(
      "R$ " + parseFloat(produtos[i].valor).toFixed(2)
    );
    var buttonText = document.createTextNode("Comprar");
    productImg.src = "../assets/images/" + produtos[i].file.substring(12);
    cardTitle.appendChild(title);
    cardDescription.appendChild(description);
    productPrice.appendChild(price);
    buttonComprar.appendChild(buttonText);
    // Adicionando elementos no card
    titleDescriptionContainer.appendChild(cardTitle);
    titleDescriptionContainer.appendChild(cardDescription);
    productImageTitle.appendChild(productImg);
    productImageTitle.appendChild(titleDescriptionContainer);
    priceContainer.appendChild(productPrice);
    priceContainer.appendChild(buttonComprar);
    card.appendChild(productImageTitle);
    card.appendChild(priceContainer);

    // Função que adiciona os produtos no carrinho
    buttonComprar.addEventListener("click", function (e) {
      let compraObj = {
        file: "../assets/images/" + produtos[i].file.substring(12),
        nomeProd: produtos[i].nomeProd,
        descricao: produtos[i].descricao,
        valor: produtos[i].valor,
        categoria: produtos[i].categoria,
      };

      cart.push(compraObj);
      adicionaProdutoNoCarrinho(cart);
      alert("Produto Adicionado no Carrinho");
    });

    if (n2 == 0) {
      if (produtos[i].valor >= n1) {
        productsContainer.appendChild(card);
        todos.classList.add("active");
        pizza.classList.remove("active");
        sobremesa.classList.remove("active");
        lanche.classList.remove("active");
        acai.classList.remove("active");
        bebidas.classList.remove("active");
      }
    } else if (produtos[i].valor >= n1 && produtos[i].valor <= n2) {
      productsContainer.appendChild(card);
      todos.classList.add("active");
      pizza.classList.remove("active");
      sobremesa.classList.remove("active");
      lanche.classList.remove("active");
      acai.classList.remove("active");
      bebidas.classList.remove("active");
    }
  }
}

// Adiciona o produto no carrinho
function adicionaProdutoNoCarrinho(array) {
  let arrayCarrinho = array;
  cartContainer.innerHTML = "";
  discountPaymentContainer.style.display = "flex";
  btnFecharPedido.style.display = "block";
  escolher.style.display = "block";

  for (let i = 0; i < arrayCarrinho.length; i++) {
    // Containers
    let card = document.createElement("div");
    let productImageTitle = document.createElement("div");
    let priceContainer = document.createElement("div");
    let titleDescriptionContainer = document.createElement("div");
    // Elementos
    let productImg = document.createElement("img");
    let cardTitle = document.createElement("h3");
    let cardDescription = document.createElement("p");
    let productPrice = document.createElement("p");
    let selectQuantity = document.createElement("select");
    var option = document.createElement("option");
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var option3 = document.createElement("option");
    var option4 = document.createElement("option");
    var option5 = document.createElement("option");
    var option6 = document.createElement("option");
    var option7 = document.createElement("option");
    var option8 = document.createElement("option");
    var option9 = document.createElement("option");
    var trash = document.createElement("p");
    var closeX = document.createElement("p");
    // Adicionando classes aos elementos
    card.classList.add("card");
    productImageTitle.classList.add("productImageTitle");
    priceContainer.classList.add("priceContainer");
    productImg.classList.add("productImg");
    titleDescriptionContainer.classList.add("titleDescriptionContainer");
    cardTitle.classList.add("cardTitle");
    cardDescription.classList.add("cardDescription");
    productPrice.classList.add("price");
    selectQuantity.classList.add("btn");
    selectQuantity.classList.add("selectQuantity");
    trash.classList.add("trash");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash");
    closeX.classList.add("closeX");
    closeX.classList.add("fa-solid");
    closeX.classList.add("fa-x");
    // Adicionando conteudo nos elementos
    var title = document.createTextNode(arrayCarrinho[i].nomeProd);
    var description = document.createTextNode(arrayCarrinho[i].descricao);
    var price = document.createTextNode(
      "R$ " + parseFloat(arrayCarrinho[i].valor).toFixed(2)
    );

    var chose = document.createTextNode("Selecione");
    var n1 = document.createTextNode(1);
    var n2 = document.createTextNode(2);
    var n3 = document.createTextNode(3);
    var n4 = document.createTextNode(4);
    var n5 = document.createTextNode(5);
    var n6 = document.createTextNode(6);
    var n7 = document.createTextNode(7);
    var n8 = document.createTextNode(8);
    var n9 = document.createTextNode(9);
    productImg.src = arrayCarrinho[i].file;
    cardTitle.appendChild(title);
    cardDescription.appendChild(description);
    productPrice.appendChild(price);
    option.appendChild(chose);
    option1.appendChild(n1);
    option2.appendChild(n2);
    option3.appendChild(n3);
    option4.appendChild(n4);
    option5.appendChild(n5);
    option6.appendChild(n6);
    option7.appendChild(n7);
    option8.appendChild(n8);
    option9.appendChild(n9);
    // Adicionando elementos no card
    titleDescriptionContainer.appendChild(cardTitle);
    titleDescriptionContainer.appendChild(cardDescription);
    productImageTitle.appendChild(productImg);
    productImageTitle.appendChild(titleDescriptionContainer);
    priceContainer.appendChild(productPrice);
    priceContainer.appendChild(selectQuantity);
    selectQuantity.appendChild(option);
    selectQuantity.appendChild(option1);
    selectQuantity.appendChild(option2);
    selectQuantity.appendChild(option3);
    selectQuantity.appendChild(option4);
    selectQuantity.appendChild(option5);
    selectQuantity.appendChild(option6);
    selectQuantity.appendChild(option7);
    selectQuantity.appendChild(option8);
    selectQuantity.appendChild(option9);
    card.appendChild(productImageTitle);
    card.appendChild(closeX);
    card.appendChild(priceContainer);
    // Adicionando card e icone de lixo na tela
    cartContainer.appendChild(card);
    cartContainer.appendChild(trash);

    // Função que pega o valor total dos produtos no carrinho
    selectQuantity.addEventListener("change", function () {
      valorQuantidade = parseInt(selectQuantity.value);
      valorTotal = valorQuantidade * arrayCarrinho[i].valor;
      precosProdArray.push(valorTotal);

      // Realizando o calculo dos valores do array
      valorTotal = +precosProdArray.reduce(
        (total, currentElement) => total + currentElement
      );

      valorFinal = `${valorTotal.toFixed(2)}`;
      subtotal.innerHTML = `R$ ${valorFinal}`;
      totalCampo.innerHTML = `R$ ${valorFinal}`;
      selectQuantity.disabled = true;
    });

    // Função que remove o card e o valor do prod do carrinho
    trash.addEventListener("click", function () {
      discountInput.value = "";
      totalCampo.innerHTML = "";
      card.style.display = "none";
      trash.style.display = "none";
      let indice = precosProdArray.indexOf(precosProdArray[i]);

      precosProdArray[i] = precosProdArray[i] - precosProdArray[indice];

      valorFinal = 0;
      valorFinal = +precosProdArray.reduce(
        (total, currentElement) => total + currentElement
      );
      subtotal.innerHTML = `R$ ${valorFinal.toFixed(2)}`;
      totalCampo.innerHTML = `R$ ${valorFinal.toFixed(2)}`;

      if (valorFinal == 0) {
        discountPaymentContainer.style.display = "none";
        btnFecharPedido.style.display = "none";
        alert("Seu carrinho está vazio. adicione produtos");
        paginaMainClient();
      }

      if (isNaN(valorFinal)) {
        alert("Seu carrinho está vazio. adicione produtos");
        paginaMainClient();
      }
    });

    closeX.addEventListener("click", function () {
      discountInput.value = "";
      totalCampo.innerHTML = "";
      card.style.display = "none";
      trash.style.display = "none";
      let indice = precosProdArray.indexOf(precosProdArray[i]);

      precosProdArray[i] = precosProdArray[i] - precosProdArray[indice];

      valorFinal = 0;
      valorFinal = +precosProdArray.reduce(
        (total, currentElement) => total + currentElement
      );
      subtotal.innerHTML = `R$ ${valorFinal.toFixed(2)}`;
      totalCampo.innerHTML = `R$ ${valorFinal.toFixed(2)}`;

      if (valorFinal == 0) {
        discountPaymentContainer.style.display = "none";
        btnFecharPedido.style.display = "none";
        alert("Seu carrinho está vazio. adicione produtos");
        paginaMainClient();
      }

      if (isNaN(valorFinal)) {
        alert("Seu carrinho está vazio. adicione produtos");
        paginaMainClient();
      }
    });

    // Aplicando o desconto se for passado o cupom.
    discountInput.addEventListener("change", function () {
      valorFinalDescontado = 0;
      if (discountInput.value == "0") {
        valorDesconto = 0;
      }
      if (discountInput.value == "1") {
        valorDesconto = (valorFinal / 100) * 5;
      }
      if (discountInput.value == "2") {
        valorDesconto = (valorFinal / 100) * 10;
      }
      if (discountInput.value == "3") {
        valorDesconto = (valorFinal / 100) * 15;
      }
      valorFinalDescontado = valorFinal - valorDesconto;
      totalCampo.innerHTML = `R$ ${valorFinalDescontado.toFixed(2)}`;
    });
  }
}
// Direcionamentos
function paginaMainClient() {
  window.location.href = "./main_client.html";
}

function abrirTelaCarrinho() {
  mainClientContainer.style.display = "none";
  mainCartContainer.style.display = "block";
  filterContainer.style.display = "none";
}

function fecharTelaCarrinho() {
  mainClientContainer.style.display = "flex";
  filterContainer.style.display = "flex";
  mainCartContainer.style.display = "none";
}
