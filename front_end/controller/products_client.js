// Containers das telas:
let mainClientContainer = document.getElementById("elementsContainer");
let mainCartContainer = document.getElementById("elementsContainerCart");
let productsContainer = document.getElementById("productsContainer");
let cartContainer = document.getElementById("cartContainer");
// Botões das telas
let btnAdd = document.getElementById("btnAdd");
let btnCadastro = document.getElementById("btnCadastrar");
let btnCancelar = document.getElementById("btnCancelar");
let az = document.getElementById("az");
// Itens do Menu
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
let precoFinal = [];

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
  })
);

az.addEventListener("click", function (e) {
  e.preventDefault();
  ordenaProdutos();
});

// Funções de funcionalidade do LocalStorage
// function cadastrarProduto() {
//   let nomeProd = document.getElementById("nomeProd");
//   let categoria = document.getElementById("categoria");
//   let descricao = document.getElementById("descricao");
//   let valor = document.getElementById("valor");
//   let file = document.getElementById("file");

//   //Instancia da classe produto
//   let produto = new Produto(
//     nomeProd.value,
//     categoria.value.toLowerCase(),
//     descricao.value,
//     valor.value,
//     file.value
//   );

//   if (produto.validarDados()) {
//     bd.gravar(produto);
//     alert("Produto Inserido com Sucesso");
//     window.location.reload();
//   } else {
//     alert("Campos não foram devidamente preenchidos");
//   }
// }

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
    let buttonEdit = document.createElement("button");
    // Adicionando classes aos elementos
    card.classList.add("card");
    productImageTitle.classList.add("productImageTitle");
    priceContainer.classList.add("priceContainer");
    productImg.classList.add("productImg");
    titleDescriptionContainer.classList.add("titleDescriptionContainer");
    cardTitle.classList.add("cardTitle");
    cardDescription.classList.add("cardDescription");
    productPrice.classList.add("price");
    buttonEdit.classList.add("btn");
    buttonEdit.classList.add("btnEdit");
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
    buttonEdit.appendChild(buttonText);
    // Adicionando elementos no card
    titleDescriptionContainer.appendChild(cardTitle);
    titleDescriptionContainer.appendChild(cardDescription);
    productImageTitle.appendChild(productImg);
    productImageTitle.appendChild(titleDescriptionContainer);
    priceContainer.appendChild(productPrice);
    priceContainer.appendChild(buttonEdit);
    card.appendChild(productImageTitle);
    card.appendChild(priceContainer);

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
  let valorQuantidade = 0;

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
    card.appendChild(priceContainer);
    // Adicionando card na tela
    cartContainer.appendChild(card);
    // Função que pega o valor total dos produtos no carrinho
    selectQuantity.addEventListener("change", function () {
      valorQuantidade = parseInt(selectQuantity.value);
      valorTotal = valorQuantidade * arrayCarrinho[i].valor;
      precoFinal.push(valorTotal);
      selectQuantity.disabled = true;

      let valorFinal = +precoFinal.reduce(
        (total, currentElement) => total + currentElement
      );
      console.log(valorFinal);
    });
  }
}

function calculaPagamento(n1, n2, desc = 0, valorTotal) {
  valorTotal = n1 * n2 - desc;
  parseInt(valorTotal);
  console.log(valorTotal);
}

// Direcionamentos
function paginaAddProduto() {
  window.location.href = "../view/add_produto.html";
}

function paginaMainAdmin() {
  window.location.href = "./main_admin.html";
}

function abrirTelaCarrinho() {
  mainClientContainer.style.display = "none";
  mainCartContainer.style.display = "block";
}

function fecharTelaCarrinho() {
  window.location.reload();
}
