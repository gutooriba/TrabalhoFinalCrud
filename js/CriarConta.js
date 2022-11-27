const form = document.getElementById("formCadastro")
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let senhaVerificada = document.querySelector("#senhaVerificada");

document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  salvar(email.value, senha.value, senhaVerificada.value);
  preencherTabela();
});

function salvar(email, senha, senhaVerificada) {
  if (email === "" || senha === "" || senhaVerificada === "") {
    alert("Preencha os campos");
  }
  else if(senha !== senhaVerificada) {
    alert("Senhas não são iguais");

  }
  else{ 
    let db = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioExiste = db.find((e)=> e.email === email) !== undefined
    if(usuarioExiste){
      alert("Usuário Existe")
      
      form.reset()
    }else{
      let usuario = {
        id: db.length + 1,
        email,
        senha,
        recados : []
      };
    
      db.push(usuario);
    
      localStorage.setItem("usuarios", JSON.stringify(db))
      localStorage.setItem("logado", email)
      window.location.href = "recados.html"
    }

   
}

let tbody = document.querySelector("#tbody");}
 


const remover = (id) => {
  let db = JSON.parse(localStorage.getItem("usuarios") || "[]");

  const posicao = db.findIndex((el)=> el.id == id);

  db.splice(posicao, 1);
  localStorage.setItem("usuarios", JSON.stringify(db))
  preencherTabela();
}

window.addEventListener("load", redirecionaIfLogado)

function redirecionaIfLogado()
{
const userLogado = localStorage.getItem("logado" ) !== null
if(userLogado){
window.location.href = "recados.html"

}
}
const reset = (det,desc)=>{
  det = ""
  desc = ""
}
