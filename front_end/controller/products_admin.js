let productsContainer = document.getElementById("productsContainer");
// Elementos
let az = document.getElementById("az");
let btnAdd = document.getElementById("btnAdd");
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
let produtos = [
  {
    image: "../assets/images/pizza_marguerita.jpg",
    nome: "Pizza Marguerita",
    descricao: "(Mussarela, tomate, majericão, orégano)",
    preco: (60.0).toFixed(2),
    categoria: "pizza",
  },
  {
    image: "../assets/images/torta_leite.jpg",
    nome: "Torta de Leite Ninho",
    descricao:
      "(Massa de Baunilha, creme de ninho tradicional, morango, chantilly)",
    preco: (70.0).toFixed(2),
    categoria: "sobremesa",
  },
  {
    image: "../assets/images/x_burguer.jpg",
    nome: "Lanche X-Burguer",
    descricao:
      "(Pão, hamburguer, alface, tomate, queijo cheddar, cebola e picles)",
    preco: (22.0).toFixed(2),
    categoria: "lanche",
  },
  {
    image: "../assets/images/pizza_strogonofe.jpg",
    nome: "Pizza de Strogonofe",
    descricao: "(Strogonofe, mussarela e orégano)",
    preco: (65.0).toFixed(2),
    categoria: "pizza",
  },
  {
    image: "../assets/images/coca_cola.jpg",
    nome: "Refrigerante Coca-Cola 350ml",
    descricao: "(Água gaseificada, açúcar, extrato de noz de cola)",
    preco: (6.0).toFixed(2),
    categoria: "bebidas",
  },
  {
    image: "../assets/images/taca_sonho_de_valsa.jpg",
    nome: "Taça de sonho de valsa",
    descricao:
      "(Chocolate branco e preto, sonho de valsa, morango e leite condensado)",
    preco: (15.0).toFixed(2),
    categoria: "sobremesa",
  },
  {
    image: "../assets/images/barca_acai.png",
    nome: "Barca de Açaí",
    descricao:
      "(Açaí, banana, morango, uva, leite ninho em pó e leite condensado)",
    preco: (22.0).toFixed(2),
    categoria: "acai",
  },
  {
    image: "../assets/images/acai_com_frutas.jpg",
    nome: "Açaí com frutas",
    descricao:
      "(Açaí, banana, morango, uva, leite ninho em pó e leite condensado)",
    preco: (18.0).toFixed(2),
    categoria: "acai",
  },
  {
    image: "../assets/images/coca_cola_zero.jpg",
    nome: "Refrigerante Coca-Cola Zero 350ml",
    descricao: "(Água gaseificada, açúcar, extrato de noz de cola)",
    preco: (5.0).toFixed(2),
    categoria: "bebidas",
  },
  {
    image: "../assets/images/lanche_churrasco.jpg",
    nome: "Lanche de Churrasco",
    descricao:
      "(Pão, hamburguer, calabresa, iscas de carne, mussarela, cebola e picles)",
    preco: (30.0).toFixed(2),
    categoria: "lanche",
  },
];

document.querySelectorAll(".todos").forEach((elemento) =>
  elemento.addEventListener("click", function () {
    card = "todos";
    criaCardProduto(card);
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
    criaCardProduto(card);
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
    criaCardProduto(card);
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
    criaCardProduto(card);
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
    criaCardProduto(card);
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
    criaCardProduto(card);
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

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "../view/add_produto.html";
});

// Ordena os produtos em ordem alfabética
function ordenaProdutos() {
  produtos.sort(function (a, b) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  });
  criaCardProduto(card);
}

// Cria os cards dos produtos na tela
function criaCardProduto(categoria) {
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
    var title = document.createTextNode(produtos[i].nome);
    var description = document.createTextNode(produtos[i].descricao);
    var price = document.createTextNode(produtos[i].preco);
    var buttonText = document.createTextNode("Editar");
    productImg.src = produtos[i].image;
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

    if (categoria == produtos[i].categoria) {
      productsContainer.appendChild(card);
    } else if (categoria == "todos") {
      productsContainer.appendChild(card);
    }
  }
}
