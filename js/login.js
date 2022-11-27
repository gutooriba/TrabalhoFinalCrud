function login(event)
{
  event.preventDefault()
  let email = document.getElementById("email")
  let senha = document.getElementById("senha")
  
  if (email.value === "" || senha.value === "") {
    alert("Preencha os campos");
  } else { 
    let db = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const userExist = db.find((e)=>e.email === email.value) !==undefined
   
    if(userExist){
      const senhaConf = db.find((e)=>e.email === email.value).senha === senha.value 
      
      if(senhaConf){
        localStorage.setItem("logado", email.value)
        window.location.href = "recados.html"
  
      }else{
        alert("Senha inválido")
      }
    }else{
      alert("Usuário não encontrado")}
  }
} 
window.addEventListener("load", redirecionaIfLogado)

function redirecionaIfLogado(){
const userLogado = localStorage.getItem("logado" ) !== null
if(userLogado){
window.location.href = "recados.html"

}
}