// let userArray = ["m@gmail.com", 123];
// Variaveis Login
let emailLogin = document.getElementById("email_login");
let senhaLogin = document.getElementById("senha_login");
let buttonEntrar = document.getElementById("button_entrar");
let cadastroLink = document.getElementById("cadastro-link");
// Variaveis Cadastro
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let senha = document.getElementById("senha");
let senha_confirma = document.getElementById("senha_confirma");
let tipo_usuario = document.getElementById("tipo_usuario");
let buttonCadastrar = document.getElementById("button_cadastrar");
let loginLink = document.getElementById("login-link");
// Telas
let loginFormContainer = document.getElementById("login-form-container");
let cadastroFormContainer = document.getElementById("cadastro-form-container");

let userArray = [
  {
    nome: "Admin",
    email: "admin@gmail.com",
    senha: 12345,
    tipo: 1,
  },
  {
    nome: "Client",
    email: "client@gmail.com",
    senha: 12345,
    tipo: 2,
  },
];

buttonCadastrar.addEventListener("click", function (e) {
  e.preventDefault();
  cadastrarUsuario();
});

buttonEntrar.addEventListener("click", function (e) {
  e.preventDefault();
  login();
});

loginLink.addEventListener("click", function () {
  cadastroFormContainer.style.display = "none";
  loginFormContainer.style.display = "block";
});

cadastroLink.addEventListener("click", function () {
  loginFormContainer.style.display = "none";
  cadastroFormContainer.style.display = "block";
});

function cadastrarUsuario() {
  let userObj = {
    nome: nome.value,
    email: email.value,
    senha: "",
    tipo: parseInt(tipo_usuario.value),
  };

  if (senha.value == senha_confirma.value) {
    userObj.senha = senha.value;
  } else {
    alert("Senhas digitidas são diferentes");
  }
  userArray.push(userObj);
  alert("Usuário cadastrado com sucesso.");
}

function login() {
  for (let i = 0; i <= userArray.length; i++) {
    if (
      emailLogin.value == userArray[i].email &&
      senhaLogin.value == userArray[i].senha &&
      userArray[i].tipo == 1
    ) {
      window.location.href = "./view/main_admin.html";
    } else if (
      emailLogin.value == userArray[i].email &&
      senhaLogin.value == userArray[i].senha &&
      userArray[i].tipo == 2
    ) {
      window.location.href = "./view/main_client.html";
    }
  }
}
