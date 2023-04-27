// Vars pagina de cadastro
let userArray = ["mickaelbpsouza@gmail.com", 12345];
// let userArray = [["Mickael"], ["mickaelbpsouza@gmail.com"], [12345]];
let buttonCadastrar = document.getElementById("button_cadastrar");

if (buttonCadastrar) {
  buttonCadastrar.addEventListener("click", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let senhaConfirma = document.getElementById("senha_confirma").value;
    userArray[0].push(nome);
    userArray[1].push(email);
    if (senha == senhaConfirma) {
      userArray[2].push(senha);
    }
    console.log(userArray);
  });
}
export default userArray;
