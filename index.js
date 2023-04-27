let userArray = ["m@gmail.com", 123];
// Vaars Pagina de Login
let emailLogin = document.getElementById("email_login");
let senhaLogin = document.getElementById("senha_login");
let buttonEntrar = document.getElementById("button_entrar");

if (buttonEntrar) {
  buttonEntrar.addEventListener("click", function (e) {
    e.preventDefault();
    let email = emailLogin.value;
    let senha = senhaLogin.value;
    console.log(email);
    console.log(senha);

    if (email == userArray[0] && senha == userArray[1]) {
      logarAdministrador();
    }
  });
}

function logarAdministrador() {
  window.location.href = "./view/main_admin.html";
}
